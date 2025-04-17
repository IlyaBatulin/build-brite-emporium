import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products, categories, getProductsByCategory, searchProducts, getAllCategories } from "@/data/mockData";
import EnhancedProductCard from "@/components/products/EnhancedProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterOptions, Product } from "@/types";
import { Search, Filter, ArrowUpDown, SlidersHorizontal, X, Calculator, Home } from "lucide-react";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ModernFilterSidebar from "@/components/catalog/ModernFilterSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import HouseVisualizer from "@/components/visualizer/HouseVisualizer";
import FloatingCallButton from "@/components/common/FloatingCallButton";

const CatalogPage = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc" | "name-asc" | "name-desc">("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("catalog");
  const [useModernFilters, setUseModernFilters] = useState(true);

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
  
  useEffect(() => {
    if (categoryParam) {
      setActiveFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [categoryParam]);
  
  const applyFilters = () => {
    let result: Product[] = [];
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else {
      result = [...products];
    }
    
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    if (activeFilters.woodTypes.length > 0) {
      result = result.filter(product => 
        product.woodType && activeFilters.woodTypes.includes(product.woodType)
      );
    }
    
    if (activeFilters.thicknesses.length > 0) {
      result = result.filter(product => 
        product.thickness && activeFilters.thicknesses.includes(product.thickness)
      );
    }
    
    if (activeFilters.widths.length > 0) {
      result = result.filter(product => 
        product.width && activeFilters.widths.includes(product.width)
      );
    }
    
    if (activeFilters.lengths.length > 0) {
      result = result.filter(product => 
        product.length && activeFilters.lengths.includes(product.length)
      );
    }
    
    if (activeFilters.grades.length > 0) {
      result = result.filter(product => 
        product.grade && activeFilters.grades.includes(product.grade)
      );
    }
    
    if (activeFilters.moistures.length > 0) {
      result = result.filter(product => 
        product.moisture && activeFilters.moistures.includes(product.moisture)
      );
    }
    
    if (activeFilters.surfaceTreatments.length > 0) {
      result = result.filter(product => 
        product.surfaceTreatment && activeFilters.surfaceTreatments.includes(product.surfaceTreatment)
      );
    }
    
    if (activeFilters.purposes.length > 0) {
      result = result.filter(product => 
        product.purpose && activeFilters.purposes.includes(product.purpose)
      );
    }
    
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
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
  
  const handleSort = (order: "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc") => {
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
        <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 md:p-8 rounded-xl mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603470219686-b3f32dbfa7cb?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Каталог пиломатериалов</h1>
            <p className="text-green-50 max-w-2xl text-lg">
              Больше чем стройматериалы — качество, проверенное временем
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="catalog" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden md:inline">Расчет стоимости</span>
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">3D визуализация</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalog">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Поиск товаров..."
                      className="pl-10 w-full md:w-64 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      value={localSearchQuery}
                      onChange={(e) => setLocalSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="bg-green-700 hover:bg-green-800">Найти</Button>
                </form>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUseModernFilters(!useModernFilters)}
                      className="text-xs border-gray-300"
                    >
                      {useModernFilters ? "Классические фильтры" : "Современные фильтры"}
                    </Button>
                  </div>
                
                  <Select
                    onValueChange={(value) => handleSort(value as any)}
                    defaultValue={sortOrder}
                  >
                    <SelectTrigger className="w-full md:w-[200px] border-gray-300">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Сортировка</SelectLabel>
                        <SelectItem value="default">По умолчанию</SelectItem>
                        <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                        <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                        <SelectItem value="name-asc">Название: А-Я</SelectItem>
                        <SelectItem value="name-desc">Название: Я-А</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="hidden md:block w-full md:w-72 lg:w-80 flex-shrink-0">
                {useModernFilters ? (
                  <ModernFilterSidebar 
                    onFilterChange={handleFilterChange}
                    initialFilters={activeFilters}
                  />
                ) : (
                  <FilterSidebar 
                    onFilterChange={handleFilterChange}
                    initialFilters={activeFilters}
                  />
                )}
              </div>
              
              <div className="md:hidden w-full mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full border-gray-300 shadow-sm">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Фильтры
                      {totalFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-green-600 text-white">
                          {totalFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[90vw] sm:max-w-md overflow-y-auto">
                    <SheetHeader className="text-left">
                      <SheetTitle className="text-xl font-bold">Фильтры</SheetTitle>
                      <SheetDescription>
                        Настройте параметры фильтрации для поиска нужных товаров
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      {useModernFilters ? (
                        <ModernFilterSidebar
                          onFilterChange={handleFilterChange}
                          initialFilters={activeFilters}
                        />
                      ) : (
                        <FilterSidebar
                          onFilterChange={handleFilterChange}
                          initialFilters={activeFilters}
                        />
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="flex-1">
                {isMobile && totalFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(activeFilters).flatMap(([key, values]) =>
                      values.length > 0 ? [
                        <Badge key={key} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                          {key}: {values.length}
                          <button onClick={() => {
                            setActiveFilters(prev => ({ ...prev, [key]: [] }));
                          }} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                      ] : []
                    )}
                    {totalFiltersCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sm text-gray-500 ml-auto hover:text-gray-900"
                        onClick={clearAllFilters}
                      >
                        Сбросить все
                      </Button>
                    )}
                  </div>
                )}
                
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="text-sm text-gray-500 mb-4">
                      Найдено товаров: <span className="font-semibold text-gray-800">{filteredProducts.length}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <EnhancedProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Товары не найдены</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска или фильтры.
                    </p>
                    <Button onClick={clearAllFilters} className="bg-green-700 hover:bg-green-800">
                      Сбросить все фильтры
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calculator">
            <div className="flex justify-center py-8">
              <PriceCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="visualizer">
            <div className="py-6">
              <HouseVisualizer />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <FloatingCallButton />
    </Layout>
  );
};

export default CatalogPage;
