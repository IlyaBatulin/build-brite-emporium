import { useState, useEffect } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FilterOptions, woodTypes, thicknesses, widths, lengths, grades, moistures, surfaceTreatments, purposes } from "@/types";
import { getAllCategories } from "@/data/mockData";
import { ChevronRight, X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const FilterSidebar = ({ onFilterChange, initialFilters }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialFilters?.categories || [],
    woodTypes: initialFilters?.woodTypes || [],
    thicknesses: initialFilters?.thicknesses || [],
    widths: initialFilters?.widths || [],
    lengths: initialFilters?.lengths || [],
    grades: initialFilters?.grades || [],
    moistures: initialFilters?.moistures || [],
    surfaceTreatments: initialFilters?.surfaceTreatments || [],
    purposes: initialFilters?.purposes || [],
  });
  
  const allCategories = getAllCategories();
  const [activeFiltersCount, setActiveFiltersCount] = useState<Record<string, number>>({
    categories: 0,
    woodTypes: 0,
    dimensions: 0,
    grades: 0,
    moistures: 0,
    treatments: 0,
    purposes: 0
  });
  
  useEffect(() => {
    onFilterChange(filters);
    
    setActiveFiltersCount({
      categories: filters.categories.length,
      woodTypes: filters.woodTypes.length,
      dimensions: filters.thicknesses.length + filters.widths.length + filters.lengths.length,
      grades: filters.grades.length,
      moistures: filters.moistures.length,
      treatments: filters.surfaceTreatments.length,
      purposes: filters.purposes.length
    });
  }, [filters, onFilterChange]);
  
  const handleCategoryChange = (categoryName: string, isParent: boolean = false, childCategories: string[] = []) => {
    setFilters(prev => {
      let newCategories = [...prev.categories];
      
      if (isParent) {
        if (newCategories.includes(categoryName)) {
          newCategories = newCategories.filter(name => name !== categoryName && !childCategories.includes(name));
        } else {
          newCategories.push(categoryName);
          childCategories.forEach(child => {
            if (!newCategories.includes(child)) {
              newCategories.push(child);
            }
          });
        }
      } else {
        if (newCategories.includes(categoryName)) {
          newCategories = newCategories.filter(name => name !== categoryName);
        } else {
          newCategories.push(categoryName);
        }
      }
      
      return { ...prev, categories: newCategories };
    });
  };
  
  const handleWoodTypeChange = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.woodTypes.includes(type)
        ? prev.woodTypes.filter(t => t !== type)
        : [...prev.woodTypes, type];
      
      return { ...prev, woodTypes: newTypes };
    });
  };
  
  const handleWoodGroupChange = (groupTypes: string[]) => {
    setFilters(prev => {
      const allSelected = groupTypes.every(type => prev.woodTypes.includes(type));
      
      let newTypes = [...prev.woodTypes];
      
      if (allSelected) {
        newTypes = newTypes.filter(type => !groupTypes.includes(type));
      } else {
        groupTypes.forEach(type => {
          if (!newTypes.includes(type)) {
            newTypes.push(type);
          }
        });
      }
      
      return { ...prev, woodTypes: newTypes };
    });
  };
  
  const handleGradeChange = (grade: string) => {
    setFilters(prev => {
      const newGrades = prev.grades.includes(grade)
        ? prev.grades.filter(g => g !== grade)
        : [...prev.grades, grade];
      
      return { ...prev, grades: newGrades };
    });
  };
  
  const handleMoistureChange = (moisture: string) => {
    setFilters(prev => {
      const newMoistures = prev.moistures.includes(moisture)
        ? prev.moistures.filter(m => m !== moisture)
        : [...prev.moistures, moisture];
      
      return { ...prev, moistures: newMoistures };
    });
  };
  
  const handleSurfaceTreatmentChange = (treatment: string) => {
    setFilters(prev => {
      const newTreatments = prev.surfaceTreatments.includes(treatment)
        ? prev.surfaceTreatments.filter(t => t !== treatment)
        : [...prev.surfaceTreatments, treatment];
      
      return { ...prev, surfaceTreatments: newTreatments };
    });
  };
  
  const handlePurposeChange = (purpose: string) => {
    setFilters(prev => {
      const newPurposes = prev.purposes.includes(purpose)
        ? prev.purposes.filter(p => p !== purpose)
        : [...prev.purposes, purpose];
      
      return { ...prev, purposes: newPurposes };
    });
  };
  
  const handleThicknessChange = (value: number) => {
    setFilters(prev => {
      const newThicknesses = prev.thicknesses.includes(value)
        ? prev.thicknesses.filter(t => t !== value)
        : [...prev.thicknesses, value];
      
      return { ...prev, thicknesses: newThicknesses };
    });
  };
  
  const handleWidthChange = (value: number) => {
    setFilters(prev => {
      const newWidths = prev.widths.includes(value)
        ? prev.widths.filter(w => w !== value)
        : [...prev.widths, value];
      
      return { ...prev, widths: newWidths };
    });
  };
  
  const handleLengthChange = (value: number) => {
    setFilters(prev => {
      const newLengths = prev.lengths.includes(value)
        ? prev.lengths.filter(l => l !== value)
        : [...prev.lengths, value];
      
      return { ...prev, lengths: newLengths };
    });
  };
  
  const clearFilterSection = (section: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [section]: []
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      woodTypes: [],
      thicknesses: [],
      widths: [],
      lengths: [],
      grades: [],
      moistures: [],
      surfaceTreatments: [],
      purposes: [],
    });
  };
  
  const topLevelCategories = allCategories.filter(cat => !cat.parentId);
  const groupedByParent: Record<string, typeof allCategories> = {};
  
  allCategories.forEach(cat => {
    if (cat.parentId) {
      if (!groupedByParent[cat.parentId]) {
        groupedByParent[cat.parentId] = [];
      }
      groupedByParent[cat.parentId].push(cat);
    }
  });
  
  const coniferousTypes = ['Сосна', 'Ель'];
  const deciduousTypes = ['Дуб', 'Бук', 'Ясень', 'Ольха', 'Берёза'];
  const exoticTypes = ['Тик', 'Махагони', 'Венге', 'Мербау', 'Ироко', 'Зебрано', 'Палисандр'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 border border-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Фильтры</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-sm hover:bg-gray-100 transition-colors"
        >
          Сбросить все
        </Button>
      </div>
      
      {(filters.categories.length > 0 || 
        filters.woodTypes.length > 0 || 
        filters.thicknesses.length > 0 ||
        filters.widths.length > 0 ||
        filters.lengths.length > 0 ||
        filters.grades.length > 0 ||
        filters.moistures.length > 0 ||
        filters.surfaceTreatments.length > 0 ||
        filters.purposes.length > 0) && (
        <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-100">
          {filters.categories.map(cat => (
            <Badge key={cat} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
              {cat}
              <button onClick={() => handleCategoryChange(cat)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}
          {filters.woodTypes.map(type => (
            <Badge key={type} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
              {type}
              <button onClick={() => handleWoodTypeChange(type)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      <Accordion type="multiple" className="w-full space-y-2">
        <AccordionItem value="categories" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Категории продукции</span>
              {activeFiltersCount.categories > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.categories}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {topLevelCategories.map((category) => {
                const childCategories = groupedByParent[category.id] || [];
                const childCategoryNames = childCategories.map(c => c.name);
                const isParentSelected = filters.categories.includes(category.name);
                const areAllChildrenSelected = childCategories.length > 0 && 
                  childCategories.every(child => filters.categories.includes(child.name));
                
                return (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={isParentSelected || areAllChildrenSelected}
                        onCheckedChange={() => handleCategoryChange(category.name, true, childCategoryNames)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                    
                    {childCategories.length > 0 && (
                      <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                        {childCategories.map(subCategory => {
                          const subChildCategories = groupedByParent[subCategory.id] || [];
                          const subChildCategoryNames = subChildCategories.map(c => c.name);
                          const isSubParentSelected = filters.categories.includes(subCategory.name);
                          const areAllSubChildrenSelected = subChildCategories.length > 0 && 
                            subChildCategories.every(child => filters.categories.includes(child.name));
                          
                          return (
                            <div key={subCategory.id} className="space-y-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id={`category-${subCategory.id}`}
                                  checked={isSubParentSelected || areAllSubChildrenSelected}
                                  onCheckedChange={() => handleCategoryChange(subCategory.name, true, subChildCategoryNames)}
                                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                />
                                <Label
                                  htmlFor={`category-${subCategory.id}`}
                                  className="ml-2 text-sm cursor-pointer"
                                >
                                  {subCategory.name}
                                </Label>
                              </div>
                              
                              {subChildCategories.length > 0 && (
                                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                                  {subChildCategories.map(subChildCategory => (
                                    <div key={subChildCategory.id} className="flex items-center">
                                      <Checkbox
                                        id={`category-${subChildCategory.id}`}
                                        checked={filters.categories.includes(subChildCategory.name)}
                                        onCheckedChange={() => handleCategoryChange(subChildCategory.name)}
                                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                      />
                                      <Label
                                        htmlFor={`category-${subChildCategory.id}`}
                                        className="ml-2 text-sm cursor-pointer"
                                      >
                                        {subChildCategory.name}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {activeFiltersCount.categories > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('categories')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить категории
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="woodTypes" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Породы древесины</span>
              {activeFiltersCount.woodTypes > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.woodTypes}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox
                    id="wood-coniferous"
                    checked={coniferousTypes.every(type => filters.woodTypes.includes(type))}
                    onCheckedChange={() => handleWoodGroupChange(coniferousTypes)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor="wood-coniferous"
                    className="ml-2 text-sm font-medium cursor-pointer"
                  >
                    Хвойные породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {coniferousTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`wood-${type}`}
                        checked={filters.woodTypes.includes(type)}
                        onCheckedChange={() => handleWoodTypeChange(type)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label
                        htmlFor={`wood-${type}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox
                    id="wood-deciduous"
                    checked={deciduousTypes.every(type => filters.woodTypes.includes(type))}
                    onCheckedChange={() => handleWoodGroupChange(deciduousTypes)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor="wood-deciduous"
                    className="ml-2 text-sm font-medium cursor-pointer"
                  >
                    Лиственные породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {deciduousTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`wood-${type}`}
                        checked={filters.woodTypes.includes(type)}
                        onCheckedChange={() => handleWoodTypeChange(type)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label
                        htmlFor={`wood-${type}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox
                    id="wood-exotic"
                    checked={exoticTypes.every(type => filters.woodTypes.includes(type))}
                    onCheckedChange={() => handleWoodGroupChange(exoticTypes)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor="wood-exotic"
                    className="ml-2 text-sm font-medium cursor-pointer"
                  >
                    Экзотические породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {exoticTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`wood-${type}`}
                        checked={filters.woodTypes.includes(type)}
                        onCheckedChange={() => handleWoodTypeChange(type)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label
                        htmlFor={`wood-${type}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {activeFiltersCount.woodTypes > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('woodTypes')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить породы
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="dimensions" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Размеры</span>
              {activeFiltersCount.dimensions > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.dimensions}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Толщина (мм):</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {thicknesses.map(thickness => (
                    <Button
                      key={thickness}
                      variant={filters.thicknesses.includes(thickness) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleThicknessChange(thickness)}
                      className={`text-xs h-8 ${
                        filters.thicknesses.includes(thickness) 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {thickness}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Ширина (мм):</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {widths.map(width => (
                    <Button
                      key={width}
                      variant={filters.widths.includes(width) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWidthChange(width)}
                      className={`text-xs h-8 ${
                        filters.widths.includes(width) 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {width}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Длина (мм):</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {lengths.map(length => (
                    <Button
                      key={length}
                      variant={filters.lengths.includes(length) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLengthChange(length)}
                      className={`text-xs h-8 ${
                        filters.lengths.includes(length) 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {length}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {activeFiltersCount.dimensions > 0 && (
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => clearFilterSection('thicknesses')}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  Очистить толщину
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => clearFilterSection('widths')}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  Очистить ширину
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => clearFilterSection('lengths')}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  Очистить длину
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="grade" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Сортность</span>
              {activeFiltersCount.grades > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.grades}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {grades.map(grade => (
                <div key={grade} className="flex items-center">
                  <Checkbox
                    id={`grade-${grade}`}
                    checked={filters.grades.includes(grade)}
                    onCheckedChange={() => handleGradeChange(grade)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={`grade-${grade}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {grade}
                  </Label>
                </div>
              ))}
            </div>
            {activeFiltersCount.grades > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('grades')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить сортность
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="moisture" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Влажность</span>
              {activeFiltersCount.moistures > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.moistures}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {moistures.map(moisture => (
                <div key={moisture} className="flex items-center">
                  <Checkbox
                    id={`moisture-${moisture}`}
                    checked={filters.moistures.includes(moisture)}
                    onCheckedChange={() => handleMoistureChange(moisture)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={`moisture-${moisture}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {moisture}
                  </Label>
                </div>
              ))}
            </div>
            {activeFiltersCount.moistures > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('moistures')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить влажность
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="treatment" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Обработка поверхности</span>
              {activeFiltersCount.treatments > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.treatments}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {surfaceTreatments.map(treatment => (
                <div key={treatment} className="flex items-center">
                  <Checkbox
                    id={`treatment-${treatment}`}
                    checked={filters.surfaceTreatments.includes(treatment)}
                    onCheckedChange={() => handleSurfaceTreatmentChange(treatment)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={`treatment-${treatment}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {treatment}
                  </Label>
                </div>
              ))}
            </div>
            {activeFiltersCount.treatments > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('surfaceTreatments')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить обработку
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="purpose" className="border border-gray-100 rounded-md">
          <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-t-md">
            <div className="flex justify-between items-center w-full">
              <span>Назначение</span>
              {activeFiltersCount.purposes > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.purposes}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {purposes.map(purpose => (
                <div key={purpose} className="flex items-center">
                  <Checkbox
                    id={`purpose-${purpose}`}
                    checked={filters.purposes.includes(purpose)}
                    onCheckedChange={() => handlePurposeChange(purpose)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={`purpose-${purpose}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {purpose}
                  </Label>
                </div>
              ))}
            </div>
            {activeFiltersCount.purposes > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => clearFilterSection('purposes')}
                className="mt-4 text-xs text-gray-600 hover:text-gray-900"
              >
                Очистить назначение
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
