import { useState, useEffect } from "react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FilterOptions, coniferousTypes, deciduousTypes, exoticTypes, thicknesses, widths, lengths, grades, moistures, surfaceTreatments, purposes } from "@/types";
import { getAllCategories } from "@/data/mockData";
import { ChevronDown, ChevronRight, X, Filter, Check } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ModernFilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

// Helper function to get wood type image path
const getWoodTypeImagePath = (woodType: string) => {
  const normalizedName = woodType.toLowerCase().replace(' ', '_');
  return `/images/wood/${normalizedName}.jpg`;
};

const ModernFilterSidebar = ({ onFilterChange, initialFilters }: ModernFilterSidebarProps) => {
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

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    woodTypes: false,
    dimensions: false,
    grade: false,
    moisture: false,
    treatment: false,
    purpose: false
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
  
  // Handle category changes
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
  
  // Handle wood type changes
  const handleWoodTypeChange = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.woodTypes.includes(type)
        ? prev.woodTypes.filter(t => t !== type)
        : [...prev.woodTypes, type];
      
      return { ...prev, woodTypes: newTypes };
    });
  };
  
  // Handle wood group changes
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
  
  // Handle grade changes
  const handleGradeChange = (grade: string) => {
    setFilters(prev => {
      const newGrades = prev.grades.includes(grade)
        ? prev.grades.filter(g => g !== grade)
        : [...prev.grades, grade];
      
      return { ...prev, grades: newGrades };
    });
  };
  
  // Handle moisture changes
  const handleMoistureChange = (moisture: string) => {
    setFilters(prev => {
      const newMoistures = prev.moistures.includes(moisture)
        ? prev.moistures.filter(m => m !== moisture)
        : [...prev.moistures, moisture];
      
      return { ...prev, moistures: newMoistures };
    });
  };
  
  // Handle surface treatment changes
  const handleSurfaceTreatmentChange = (treatment: string) => {
    setFilters(prev => {
      const newTreatments = prev.surfaceTreatments.includes(treatment)
        ? prev.surfaceTreatments.filter(t => t !== treatment)
        : [...prev.surfaceTreatments, treatment];
      
      return { ...prev, surfaceTreatments: newTreatments };
    });
  };
  
  // Handle purpose changes
  const handlePurposeChange = (purpose: string) => {
    setFilters(prev => {
      const newPurposes = prev.purposes.includes(purpose)
        ? prev.purposes.filter(p => p !== purpose)
        : [...prev.purposes, purpose];
      
      return { ...prev, purposes: newPurposes };
    });
  };
  
  // Handle thickness changes
  const handleThicknessChange = (value: number) => {
    setFilters(prev => {
      const newThicknesses = prev.thicknesses.includes(value)
        ? prev.thicknesses.filter(t => t !== value)
        : [...prev.thicknesses, value];
      
      return { ...prev, thicknesses: newThicknesses };
    });
  };
  
  // Handle width changes
  const handleWidthChange = (value: number) => {
    setFilters(prev => {
      const newWidths = prev.widths.includes(value)
        ? prev.widths.filter(w => w !== value)
        : [...prev.widths, value];
      
      return { ...prev, widths: newWidths };
    });
  };
  
  // Handle length changes
  const handleLengthChange = (value: number) => {
    setFilters(prev => {
      const newLengths = prev.lengths.includes(value)
        ? prev.lengths.filter(l => l !== value)
        : [...prev.lengths, value];
      
      return { ...prev, lengths: newLengths };
    });
  };
  
  // Clear a specific filter section
  const clearFilterSection = (section: keyof FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      [section]: []
    }));
  };
  
  // Clear all filters
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
  
  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Get top level categories
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
    <div className="bg-white rounded-lg shadow-xl p-0 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-white mr-2" />
            <h2 className="text-xl font-semibold">Фильтры</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-green-700"
          >
            Сбросить все
          </Button>
        </div>
      </div>
      
      {/* Active filters */}
      {(filters.categories.length > 0 || 
        filters.woodTypes.length > 0 || 
        filters.thicknesses.length > 0 ||
        filters.widths.length > 0 ||
        filters.lengths.length > 0 ||
        filters.grades.length > 0 ||
        filters.moistures.length > 0 ||
        filters.surfaceTreatments.length > 0 ||
        filters.purposes.length > 0) && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b border-gray-100">
          {filters.categories.map(cat => (
            <Badge key={cat} variant="secondary" className="px-3 py-1 rounded-full bg-green-50 hover:bg-green-100 text-green-800 border border-green-200">
              {cat}
              <button onClick={() => handleCategoryChange(cat)} className="ml-1">
                <X size={14} className="text-green-600" />
              </button>
            </Badge>
          ))}
          {filters.woodTypes.map(type => (
            <Badge key={type} variant="secondary" className="px-3 py-1 rounded-full bg-green-50 hover:bg-green-100 text-green-800 border border-green-200">
              {type}
              <button onClick={() => handleWoodTypeChange(type)} className="ml-1">
                <X size={14} className="text-green-600" />
              </button>
            </Badge>
          ))}
          {/* Other active filter badges */}
        </div>
      )}
      
      {/* Filter sections */}
      <div className="divide-y divide-gray-100">
        {/* Categories section */}
        <Collapsible
          open={expandedSections.categories}
          onOpenChange={() => toggleSection('categories')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Категории продукции</span>
              {activeFiltersCount.categories > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.categories}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
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
                      <div className="mr-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={isParentSelected || areAllChildrenSelected}
                          onCheckedChange={() => handleCategoryChange(category.name, true, childCategoryNames)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </div>
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium cursor-pointer flex-grow"
                      >
                        {category.name}
                      </Label>
                      {childCategories.length > 0 && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${isParentSelected ? 'rotate-180' : ''}`} />
                      )}
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
                                <div className="mr-2">
                                  <Checkbox
                                    id={`category-${subCategory.id}`}
                                    checked={isSubParentSelected || areAllSubChildrenSelected}
                                    onCheckedChange={() => handleCategoryChange(subCategory.name, true, subChildCategoryNames)}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                  />
                                </div>
                                <Label
                                  htmlFor={`category-${subCategory.id}`}
                                  className="text-sm cursor-pointer flex-grow"
                                >
                                  {subCategory.name}
                                </Label>
                                {subChildCategories.length > 0 && (
                                  <ChevronDown className={`h-4 w-4 transition-transform ${isSubParentSelected ? 'rotate-180' : ''}`} />
                                )}
                              </div>
                              
                              {subChildCategories.length > 0 && (
                                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                                  {subChildCategories.map(subChildCategory => (
                                    <div key={subChildCategory.id} className="flex items-center">
                                      <div className="mr-2">
                                        <Checkbox
                                          id={`category-${subChildCategory.id}`}
                                          checked={filters.categories.includes(subChildCategory.name)}
                                          onCheckedChange={() => handleCategoryChange(subChildCategory.name)}
                                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        />
                                      </div>
                                      <Label
                                        htmlFor={`category-${subChildCategory.id}`}
                                        className="text-sm cursor-pointer"
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
          </CollapsibleContent>
        </Collapsible>

        {/* Wood Types section */}
        <Collapsible
          open={expandedSections.woodTypes}
          onOpenChange={() => toggleSection('woodTypes')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Породы древесины</span>
              {activeFiltersCount.woodTypes > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.woodTypes}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.woodTypes ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            {/* Visual Wood Type Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-gray-700">Популярные породы:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Сосна', 'Дуб', 'Бук'].map(type => (
                  <div 
                    key={type}
                    onClick={() => handleWoodTypeChange(type)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      filters.woodTypes.includes(type) 
                        ? 'border-green-600 shadow-md' 
                        : 'border-transparent hover:border-green-200'
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={getWoodTypeImagePath(type)} 
                        alt={`Древесина ${type}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      {filters.woodTypes.includes(type) && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                          <Check size={14} />
                        </div>
                      )}
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium">{type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {/* Coniferous */}
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md bg-gray-50">
                  <div className="mr-2">
                    <Checkbox
                      id="wood-coniferous"
                      checked={coniferousTypes.every(type => filters.woodTypes.includes(type))}
                      onCheckedChange={() => handleWoodGroupChange(coniferousTypes)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <Label
                    htmlFor="wood-coniferous"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Хвойные породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {coniferousTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <div className="mr-2">
                        <Checkbox
                          id={`wood-${type}`}
                          checked={filters.woodTypes.includes(type)}
                          onCheckedChange={() => handleWoodTypeChange(type)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Label
                            htmlFor={`wood-${type}`}
                            className="text-sm cursor-pointer flex items-center"
                          >
                            {type}
                            <span className="ml-1 text-xs text-green-600">(фото)</span>
                          </Label>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-2">
                            <div className="font-medium">{type}</div>
                            <div className="w-full h-40 overflow-hidden rounded-md">
                              <img 
                                src={getWoodTypeImagePath(type)} 
                                alt={`Древесина ${type}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Deciduous */}
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md bg-gray-50">
                  <div className="mr-2">
                    <Checkbox
                      id="wood-deciduous"
                      checked={deciduousTypes.every(type => filters.woodTypes.includes(type))}
                      onCheckedChange={() => handleWoodGroupChange(deciduousTypes)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <Label
                    htmlFor="wood-deciduous"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Лиственные породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {deciduousTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <div className="mr-2">
                        <Checkbox
                          id={`wood-${type}`}
                          checked={filters.woodTypes.includes(type)}
                          onCheckedChange={() => handleWoodTypeChange(type)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Label
                            htmlFor={`wood-${type}`}
                            className="text-sm cursor-pointer flex items-center"
                          >
                            {type}
                            <span className="ml-1 text-xs text-green-600">(фото)</span>
                          </Label>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-2">
                            <div className="font-medium">{type}</div>
                            <div className="w-full h-40 overflow-hidden rounded-md">
                              <img 
                                src={getWoodTypeImagePath(type)} 
                                alt={`Древесина ${type}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Exotic */}
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md bg-gray-50">
                  <div className="mr-2">
                    <Checkbox
                      id="wood-exotic"
                      checked={exoticTypes.every(type => filters.woodTypes.includes(type))}
                      onCheckedChange={() => handleWoodGroupChange(exoticTypes)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <Label
                    htmlFor="wood-exotic"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Экзотические породы
                  </Label>
                </div>
                
                <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-1.5">
                  {exoticTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <div className="mr-2">
                        <Checkbox
                          id={`wood-${type}`}
                          checked={filters.woodTypes.includes(type)}
                          onCheckedChange={() => handleWoodTypeChange(type)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Label
                            htmlFor={`wood-${type}`}
                            className="text-sm cursor-pointer flex items-center"
                          >
                            {type}
                            <span className="ml-1 text-xs text-green-600">(фото)</span>
                          </Label>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-2">
                            <div className="font-medium">{type}</div>
                            <div className="w-full h-40 overflow-hidden rounded-md">
                              <img 
                                src={getWoodTypeImagePath(type)} 
                                alt={`Древесина ${type}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
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
          </CollapsibleContent>
        </Collapsible>

        {/* Dimensions section */}
        <Collapsible
          open={expandedSections.dimensions}
          onOpenChange={() => toggleSection('dimensions')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Размеры</span>
              {activeFiltersCount.dimensions > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.dimensions}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.dimensions ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            <div className="space-y-6">
              {/* Thickness chips */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Толщина (мм):</h4>
                <div className="flex flex-wrap gap-2">
                  {thicknesses.map(thickness => (
                    <div 
                      key={thickness}
                      onClick={() => handleThicknessChange(thickness)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-sm transition-all ${
                        filters.thicknesses.includes(thickness) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {thickness}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Width chips */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Ширина (мм):</h4>
                <div className="flex flex-wrap gap-2">
                  {widths.map(width => (
                    <div 
                      key={width}
                      onClick={() => handleWidthChange(width)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-sm transition-all ${
                        filters.widths.includes(width) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {width}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Length chips */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-gray-800">Длина (мм):</h4>
                <div className="flex flex-wrap gap-2">
                  {lengths.map(length => (
                    <div 
                      key={length}
                      onClick={() => handleLengthChange(length)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-sm transition-all ${
                        filters.lengths.includes(length) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {length}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {activeFiltersCount.dimensions > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
          </CollapsibleContent>
        </Collapsible>

        {/* Grade section */}
        <Collapsible
          open={expandedSections.grade}
          onOpenChange={() => toggleSection('grade')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Сортность</span>
              {activeFiltersCount.grades > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.grades}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.grade ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {grades.map(grade => (
                <div 
                  key={grade}
                  onClick={() => handleGradeChange(grade)}
                  className={`cursor-pointer p-3 rounded-md text-sm transition-all ${
                    filters.grades.includes(grade) 
                      ? 'bg-green-50 border-2 border-green-600' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      filters.grades.includes(grade) ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <span>{grade}</span>
                  </div>
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
          </CollapsibleContent>
        </Collapsible>

        {/* Moisture section */}
        <Collapsible
          open={expandedSections.moisture}
          onOpenChange={() => toggleSection('moisture')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Влажность</span>
              {activeFiltersCount.moistures > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.moistures}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.moisture ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {moistures.map(moisture => (
                <div key={moisture} className="flex items-center">
                  <div className="mr-2">
                    <Checkbox
                      id={`moisture-${moisture}`}
                      checked={filters.moistures.includes(moisture)}
                      onCheckedChange={() => handleMoistureChange(moisture)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <Label
                    htmlFor={`moisture-${moisture}`}
                    className="text-sm cursor-pointer"
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
          </CollapsibleContent>
        </Collapsible>

        {/* Surface Treatment section */}
        <Collapsible
          open={expandedSections.treatment}
          onOpenChange={() => toggleSection('treatment')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Обработка поверхности</span>
              {activeFiltersCount.treatments > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.treatments}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.treatment ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {surfaceTreatments.map(treatment => (
                <div 
                  key={treatment}
                  onClick={() => handleSurfaceTreatmentChange(treatment)}
                  className={`cursor-pointer p-3 rounded-md text-sm transition-all flex items-center ${
                    filters.surfaceTreatments.includes(treatment) 
                      ? 'bg-green-50 border border-green-600' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {filters.surfaceTreatments.includes(treatment) ? (
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded-sm mr-2"></div>
                  )}
                  <span>{treatment}</span>
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
          </CollapsibleContent>
        </Collapsible>

        {/* Purpose section */}
        <Collapsible
          open={expandedSections.purpose}
          onOpenChange={() => toggleSection('purpose')}
          className="w-full"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50">
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">Назначение</span>
              {activeFiltersCount.purposes > 0 && (
                <Badge className="ml-2 bg-green-600">{activeFiltersCount.purposes}</Badge>
              )}
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.purpose ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {purposes.map(purpose => (
                <div key={purpose} className="flex items-center">
                  <div className="mr-2">
                    <Checkbox
                      id={`purpose-${purpose}`}
                      checked={filters.purposes.includes(purpose)}
                      onCheckedChange={() => handlePurposeChange(purpose)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <Label
                    htmlFor={`purpose-${purpose}`}
                    className="text-sm cursor-pointer"
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
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ModernFilterSidebar;
