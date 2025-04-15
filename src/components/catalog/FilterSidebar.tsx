
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
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FilterOptions, woodTypes, thicknesses, widths, lengths, grades, moistures, surfaceTreatments, purposes } from "@/types";
import { getAllCategories } from "@/data/mockData";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const FilterSidebar = ({ onFilterChange, initialFilters }: FilterSidebarProps) => {
  // Initialize filters with empty arrays or initial values if provided
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
  
  // When filters change, notify the parent component
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  const handleCategoryChange = (categoryName: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryName)
        ? prev.categories.filter(name => name !== categoryName)
        : [...prev.categories, categoryName];
      
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
  
  // Group categories by parent for hierarchical display
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
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-sm"
        >
          Сбросить все
        </Button>
      </div>
      
      <Accordion type="multiple" className="w-full">
        {/* Categories Filter */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Категории продукции
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {topLevelCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.name)}
                      onCheckedChange={() => handleCategoryChange(category.name)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium"
                    >
                      {category.name}
                    </Label>
                  </div>
                  
                  {/* Show subcategories if any */}
                  {groupedByParent[category.id] && (
                    <div className="pl-6 space-y-2">
                      {groupedByParent[category.id].map(subCategory => (
                        <div key={subCategory.id} className="flex items-center">
                          <Checkbox
                            id={`category-${subCategory.id}`}
                            checked={filters.categories.includes(subCategory.name)}
                            onCheckedChange={() => handleCategoryChange(subCategory.name)}
                          />
                          <Label
                            htmlFor={`category-${subCategory.id}`}
                            className="ml-2 text-sm"
                          >
                            {subCategory.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Wood Type Filter */}
        <AccordionItem value="woodTypes">
          <AccordionTrigger className="text-sm font-medium">
            Породы древесины
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              <div className="mb-2">
                <h4 className="text-xs text-gray-600 mb-1">Хвойные породы:</h4>
                {woodTypes.filter(type => ["Сосна", "Ель"].includes(type)).map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      id={`wood-${type}`}
                      checked={filters.woodTypes.includes(type)}
                      onCheckedChange={() => handleWoodTypeChange(type)}
                    />
                    <Label
                      htmlFor={`wood-${type}`}
                      className="ml-2 text-sm"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="mb-2">
                <h4 className="text-xs text-gray-600 mb-1">Лиственные породы:</h4>
                {woodTypes.filter(type => ["Дуб", "Бук", "Ясень", "Ольха", "Берёза"].includes(type)).map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      id={`wood-${type}`}
                      checked={filters.woodTypes.includes(type)}
                      onCheckedChange={() => handleWoodTypeChange(type)}
                    />
                    <Label
                      htmlFor={`wood-${type}`}
                      className="ml-2 text-sm"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-xs text-gray-600 mb-1">Экзотические породы:</h4>
                {woodTypes.filter(type => ["Тик", "Махагони", "Венге", "Мербау", "Ироко", "Зебрано", "Палисандр"].includes(type)).map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      id={`wood-${type}`}
                      checked={filters.woodTypes.includes(type)}
                      onCheckedChange={() => handleWoodTypeChange(type)}
                    />
                    <Label
                      htmlFor={`wood-${type}`}
                      className="ml-2 text-sm"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Dimensions Filter */}
        <AccordionItem value="dimensions">
          <AccordionTrigger className="text-sm font-medium">
            Размеры
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Thickness */}
              <div>
                <h4 className="text-sm font-medium mb-2">Толщина (мм):</h4>
                <div className="grid grid-cols-3 gap-2">
                  {thicknesses.map(thickness => (
                    <Button
                      key={thickness}
                      variant={filters.thicknesses.includes(thickness) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleThicknessChange(thickness)}
                      className="text-xs h-8"
                    >
                      {thickness}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Width */}
              <div>
                <h4 className="text-sm font-medium mb-2">Ширина (мм):</h4>
                <div className="grid grid-cols-3 gap-2">
                  {widths.map(width => (
                    <Button
                      key={width}
                      variant={filters.widths.includes(width) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWidthChange(width)}
                      className="text-xs h-8"
                    >
                      {width}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Length */}
              <div>
                <h4 className="text-sm font-medium mb-2">Длина (мм):</h4>
                <div className="grid grid-cols-3 gap-2">
                  {lengths.map(length => (
                    <Button
                      key={length}
                      variant={filters.lengths.includes(length) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLengthChange(length)}
                      className="text-xs h-8"
                    >
                      {length}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Grade Filter */}
        <AccordionItem value="grade">
          <AccordionTrigger className="text-sm font-medium">
            Сортность
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {grades.map(grade => (
                <div key={grade} className="flex items-center">
                  <Checkbox
                    id={`grade-${grade}`}
                    checked={filters.grades.includes(grade)}
                    onCheckedChange={() => handleGradeChange(grade)}
                  />
                  <Label
                    htmlFor={`grade-${grade}`}
                    className="ml-2 text-sm"
                  >
                    {grade}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Moisture Filter */}
        <AccordionItem value="moisture">
          <AccordionTrigger className="text-sm font-medium">
            Влажность
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {moistures.map(moisture => (
                <div key={moisture} className="flex items-center">
                  <Checkbox
                    id={`moisture-${moisture}`}
                    checked={filters.moistures.includes(moisture)}
                    onCheckedChange={() => handleMoistureChange(moisture)}
                  />
                  <Label
                    htmlFor={`moisture-${moisture}`}
                    className="ml-2 text-sm"
                  >
                    {moisture}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Surface Treatment Filter */}
        <AccordionItem value="treatment">
          <AccordionTrigger className="text-sm font-medium">
            Обработка поверхности
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {surfaceTreatments.map(treatment => (
                <div key={treatment} className="flex items-center">
                  <Checkbox
                    id={`treatment-${treatment}`}
                    checked={filters.surfaceTreatments.includes(treatment)}
                    onCheckedChange={() => handleSurfaceTreatmentChange(treatment)}
                  />
                  <Label
                    htmlFor={`treatment-${treatment}`}
                    className="ml-2 text-sm"
                  >
                    {treatment}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Purpose Filter */}
        <AccordionItem value="purpose">
          <AccordionTrigger className="text-sm font-medium">
            Назначение
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {purposes.map(purpose => (
                <div key={purpose} className="flex items-center">
                  <Checkbox
                    id={`purpose-${purpose}`}
                    checked={filters.purposes.includes(purpose)}
                    onCheckedChange={() => handlePurposeChange(purpose)}
                  />
                  <Label
                    htmlFor={`purpose-${purpose}`}
                    className="ml-2 text-sm"
                  >
                    {purpose}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
