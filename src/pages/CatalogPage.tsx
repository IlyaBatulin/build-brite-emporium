import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products, categories, getProductsByCategory, searchProducts } from "@/data/mockData";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  
  useEffect(() => {
    let result: Product[] = [];
    
    // Apply search query if exists
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } 
    // Apply category filter if selected
    else if (selectedCategories.length > 0) {
      result = products.filter(product => 
        selectedCategories.some(catId => {
          const category = categories.find(c => c.id === catId);
          return category && product.category === category.name;
        })
      );
    } 
    // Otherwise show all products
    else {
      result = [...products];
    }
    
    // Filter by in stock
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply sorting
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, sortOrder, inStockOnly]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams);
    if (localSearchQuery) {
      params.set("search", localSearchQuery);
    } else {
      params.delete("search");
    }
    
    setSearchParams(params);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handleSort = (order: "default" | "price-asc" | "price-desc") => {
    setSortOrder(order);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setInStockOnly(false);
    setSortOrder("default");
    setLocalSearchQuery("");
    setSearchParams({});
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Каталог товаров</h1>
        
        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                className="pl-10 w-full md:w-64"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Найти</Button>
          </form>
          
          <div className="flex gap-2">
            <Button 
              variant={sortOrder === "default" ? "default" : "outline"} 
              onClick={() => handleSort("default")}
              className="text-sm"
              size="sm"
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              По умолчанию
            </Button>
            <Button 
              variant={sortOrder === "price-asc" ? "default" : "outline"} 
              onClick={() => handleSort("price-asc")}
              className="text-sm"
              size="sm"
            >
              Цена: по возрастанию
            </Button>
            <Button 
              variant={sortOrder === "price-desc" ? "default" : "outline"} 
              onClick={() => handleSort("price-desc")}
              className="text-sm"
              size="sm"
            >
              Цена: по убыванию
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Фильтры</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Сбросить
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Категории</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Наличие</h3>
              <div className="flex items-center">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                />
                <label
                  htmlFor="in-stock"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Только в наличии
                </label>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">Товары не найдены</h2>
                <p className="text-gray-600">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;
