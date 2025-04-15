
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products, categories, getProductsByCategory, searchProducts, getAllCategories } from "@/data/mockData";
import EnhancedProductCard from "@/components/products/EnhancedProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterOptions, Product } from "@/types";
import { Search, Filter, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import { useMediaQuery } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

const CatalogPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");
  
  // Set initial filters based on URL parameters
  const initialFilters: FilterOptions = {
    categories: categoryParam ? [categoryParam] : [],
    woodTypes: [],
    thicknesses: [],
    widths: [],
    lengths: [],
    grades: [],
    moistures: [],
    surfaceTreatments: [],
    purposes: []
  };
  
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(initialFilters);
  const [totalFiltersCount, setTotalFiltersCount] = useState(0);
  
  // Count total active filters
  useEffect(() => {
    let count = 0;
    Object.values(activeFilters).forEach(filterArray => {
      count += filterArray.length;
    });
    setTotalFiltersCount(count);
  }, [activeFilters]);
  
  useEffect(() => {
    applyFilters();
  }, [activeFilters, sortOrder, searchQuery]);
  
  const applyFilters = () => {
    // First get products either by search query or all products
    let result: Product[] = [];
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else {
      result = [...products];
    }
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Apply wood type filters
    if (activeFilters.woodTypes.length > 0) {
      result = result.filter(product => 
        product.woodType && activeFilters.woodTypes.includes(product.woodType)
      );
    }
    
    // Apply thickness filters
    if (activeFilters.thicknesses.length > 0) {
      result = result.filter(product => 
        product.thickness && activeFilters.thicknesses.includes(product.thickness)
      );
    }
    
    // Apply width filters
    if (activeFilters.widths.length > 0) {
      result = result.filter(product => 
        product.width && activeFilters.widths.includes(product.width)
      );
    }
    
    // Apply length filters
    if (activeFilters.lengths.length > 0) {
      result = result.filter(product => 
        product.length && activeFilters.lengths.includes(product.length)
      );
    }
    
    // Apply grade filters
    if (activeFilters.grades.length > 0) {
      result = result.filter(product => 
        product.grade && activeFilters.grades.includes(product.grade)
      );
    }
    
    // Apply moisture filters
    if (activeFilters.moistures.length > 0) {
      result = result.filter(product => 
        product.moisture && activeFilters.moistures.includes(product.moisture)
      );
    }
    
    // Apply surface treatment filters
    if (activeFilters.surfaceTreatments.length > 0) {
      result = result.filter(product => 
        product.surfaceTreatment && activeFilters.surfaceTreatments.includes(product.surfaceTreatment)
      );
    }
    
    // Apply purpose filters
    if (activeFilters.purposes.length > 0) {
      result = result.filter(product => 
        product.purpose && activeFilters.purposes.includes(product.purpose)
      );
    }
    
    // Apply sorting
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  };
  
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
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setActiveFilters(newFilters);
  };
  
  const handleSort = (order: "default" | "price-asc" | "price-desc") => {
    setSortOrder(order);
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      woodTypes: [],
      thicknesses: [],
      widths: [],
      lengths: [],
      grades: [],
      moistures: [],
      surfaceTreatments: [],
      purposes: []
    });
    setSortOrder("default");
    setLocalSearchQuery("");
    setSearchParams({});
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Каталог пиломатериалов</h1>
        
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
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              initialFilters={initialFilters}
            />
          </div>
          
          {/* Mobile Filters */}
          <div className="md:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Фильтры
                  {totalFiltersCount > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {totalFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                  <SheetDescription>
                    Настройте параметры фильтрации для поиска нужных товаров
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    initialFilters={activeFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <EnhancedProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">Товары не найдены</h2>
                <p className="text-gray-600">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button onClick={clearAllFilters} className="mt-4" variant="outline">
                  Сбросить все фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;
