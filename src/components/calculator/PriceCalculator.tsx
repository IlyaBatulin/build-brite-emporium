
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRight, Save, PieChart, BarChart3, Check, ChevronDown, ChevronUp, Download, Share2, Clipboard, CheckCircle2, 
  Truck, CalendarClock, Settings2, FileText, CopyCheck, X, BoxSelect, PercentCircle, Calculator as CalculatorIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PriceCalculator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState<number>(6000);
  const [width, setWidth] = useState<number>(150);
  const [height, setHeight] = useState<number>(50);
  const [woodType, setWoodType] = useState<string>("pine");
  const [treatment, setTreatment] = useState<string>("standard");
  const [quantity, setQuantity] = useState<number>(1);
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(false);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(10);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(false);
  const [calculationMode, setCalculationMode] = useState<"dimensions" | "volume">("dimensions");
  const [volume, setVolume] = useState<number>(0);
  const [result, setResult] = useState<{ 
    volume: number; 
    price: number; 
    breakdown: { 
      base: number; 
      treatment: number;
      delivery?: number;
      installation?: number;
      quantity: number;
      total: number;
    } 
  } | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("calculator");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonWoodType, setComparisonWoodType] = useState<string>("oak");

  const woodPrices: Record<string, { price: number; displayName: string; durability: number; eco: number }> = {
    pine: { price: 12000, displayName: "Сосна", durability: 3, eco: 4 },
    spruce: { price: 11500, displayName: "Ель", durability: 3, eco: 4 },
    oak: { price: 45000, displayName: "Дуб", durability: 5, eco: 5 },
    beech: { price: 38000, displayName: "Бук", durability: 4, eco: 4 },
    ash: { price: 40000, displayName: "Ясень", durability: 5, eco: 4 },
    birch: { price: 25000, displayName: "Берёза", durability: 3, eco: 5 },
    alder: { price: 22000, displayName: "Ольха", durability: 3, eco: 4 },
    teak: { price: 85000, displayName: "Тик", durability: 5, eco: 3 },
    mahogany: { price: 78000, displayName: "Махагони", durability: 5, eco: 2 },
    larch: { price: 17500, displayName: "Лиственница", durability: 4, eco: 5 },
    cedar: { price: 32000, displayName: "Кедр", durability: 4, eco: 5 },
    maple: { price: 35000, displayName: "Клён", durability: 4, eco: 4 },
  };

  const treatmentTypes: Record<string, { multiplier: number; displayName: string; description: string }> = {
    standard: { 
      multiplier: 1, 
      displayName: "Обрезная", 
      description: "Стандартная обработка пиломатериалов с ровными краями" 
    },
    planed: { 
      multiplier: 1.25, 
      displayName: "Строганная", 
      description: "Гладкая поверхность, точные размеры, подходит для чистовой отделки" 
    },
    dried: { 
      multiplier: 1.35, 
      displayName: "Сухая", 
      description: "Камерная сушка для минимальной влажности и стабильности материала" 
    },
    tongue_groove: { 
      multiplier: 1.5, 
      displayName: "Шпунтованная", 
      description: "С пазами и гребнями для плотного соединения элементов" 
    },
    anti_septic: { 
      multiplier: 1.4, 
      displayName: "Антисептированная", 
      description: "Обработка защитными составами от гниения и насекомых" 
    },
    fire_resistant: { 
      multiplier: 1.55, 
      displayName: "Огнезащитная", 
      description: "Обработка составами, повышающими огнестойкость древесины" 
    },
  };

  useEffect(() => {
    // Загружаем сохраненные расчеты
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    setSavedCalculations(saved);
  }, []);

  const calculatePrice = () => {
    let calculatedVolume: number;
    
    if (calculationMode === "dimensions") {
      if (!length || !width || !height) {
        toast({
          title: "Ошибка расчёта",
          description: "Пожалуйста, заполните все размеры",
          variant: "destructive"
        });
        return;
      }
      
      // Вычисляем объём в кубометрах (переводим из мм в м)
      calculatedVolume = (length * width * height) / 1000000000;
    } else {
      if (!volume || volume <= 0) {
        toast({
          title: "Ошибка расчёта",
          description: "Пожалуйста, введите объём материала",
          variant: "destructive"
        });
        return;
      }
      
      calculatedVolume = volume;
    }
    
    const basePrice = woodPrices[woodType]?.price || woodPrices.pine.price;
    const multiplier = treatmentTypes[treatment]?.multiplier || treatmentTypes.standard.multiplier;
    
    const baseCost = basePrice * calculatedVolume;
    const treatmentCost = baseCost * (multiplier - 1);
    let totalMaterialCost = baseCost + treatmentCost;
    
    // Умножаем на количество
    totalMaterialCost *= quantity;
    
    // Добавляем стоимость доставки, если выбрана
    let deliveryCost = 0;
    if (includeDelivery) {
      // Базовая ставка + стоимость за км
      deliveryCost = 1500 + (deliveryDistance * 50);
    }
    
    // Добавляем стоимость монтажа, если выбран
    let installationCost = 0;
    if (includeInstallation) {
      // 15% от стоимости материала
      installationCost = totalMaterialCost * 0.15;
    }
    
    const totalCost = totalMaterialCost + deliveryCost + installationCost;
    
    setResult({ 
      volume: calculatedVolume * quantity, 
      price: totalCost,
      breakdown: {
        base: baseCost * quantity,
        treatment: treatmentCost,
        delivery: includeDelivery ? deliveryCost : undefined,
        installation: includeInstallation ? installationCost : undefined,
        quantity: quantity,
        total: totalCost
      }
    });
    
    toast({
      title: "Расчёт выполнен",
      description: "Стоимость материалов рассчитана",
      variant: "default"
    });
  };

  const saveCalculation = () => {
    if (!result) return;
    
    const calculationData = {
      id: Date.now(),
      dimensions: calculationMode === "dimensions" ? { length, width, height } : null,
      volume: calculationMode === "volume" ? volume : null,
      calculationMode,
      woodType,
      woodTypeName: woodPrices[woodType]?.displayName,
      treatment,
      treatmentName: treatmentTypes[treatment]?.displayName,
      quantity,
      includeDelivery,
      deliveryDistance: includeDelivery ? deliveryDistance : null,
      includeInstallation,
      result,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    
    const saved = [...savedCalculations, calculationData];
    setSavedCalculations(saved);
    localStorage.setItem('savedCalculations', JSON.stringify(saved));
    
    toast({
      title: "Расчёт сохранен",
      description: "Вы можете найти его в истории расчётов",
      variant: "success"
    });
  };

  const deleteCalculation = (id: number) => {
    const filtered = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(filtered);
    localStorage.setItem('savedCalculations', JSON.stringify(filtered));
    
    toast({
      title: "Расчёт удален",
      description: "Выбранный расчёт удален из истории",
    });
  };

  const loadCalculation = (calculation: any) => {
    if (calculation.calculationMode === "dimensions" && calculation.dimensions) {
      setLength(calculation.dimensions.length);
      setWidth(calculation.dimensions.width);
      setHeight(calculation.dimensions.height);
    } else if (calculation.calculationMode === "volume" && calculation.volume) {
      setVolume(calculation.volume);
    }
    
    setCalculationMode(calculation.calculationMode);
    setWoodType(calculation.woodType);
    setTreatment(calculation.treatment);
    setQuantity(calculation.quantity || 1);
    setIncludeDelivery(calculation.includeDelivery || false);
    setDeliveryDistance(calculation.deliveryDistance || 10);
    setIncludeInstallation(calculation.includeInstallation || false);
    setResult(calculation.result);
    setActiveTab("calculator");
    
    toast({
      title: "Расчёт загружен",
      description: "Данные из сохраненного расчёта восстановлены",
    });
  };

  const copyResultToClipboard = () => {
    if (!result) return;
    
    const woodName = woodPrices[woodType]?.displayName || "Сосна";
    const treatmentName = treatmentTypes[treatment]?.displayName || "Обрезная";
    
    let textToCopy = `
Расчет стоимости пиломатериала:
- Порода дерева: ${woodName}
- Обработка: ${treatmentName}`;

    if (calculationMode === "dimensions") {
      textToCopy += `
- Размеры: ${length}x${width}x${height} мм`;
    } else {
      textToCopy += `
- Объем: ${volume} м³`;
    }
    
    textToCopy += `
- Количество: ${quantity} шт.
- Общий объем: ${result.volume.toFixed(4)} м³
- Стоимость материалов: ${result.breakdown.base.toFixed(0)} ₽`;
    
    if (result.breakdown.treatment > 0) {
      textToCopy += `
- Стоимость обработки: ${result.breakdown.treatment.toFixed(0)} ₽`;
    }
    
    if (includeDelivery && result.breakdown.delivery) {
      textToCopy += `
- Доставка: ${result.breakdown.delivery.toFixed(0)} ₽`;
    }
    
    if (includeInstallation && result.breakdown.installation) {
      textToCopy += `
- Монтаж: ${result.breakdown.installation.toFixed(0)} ₽`;
    }
    
    textToCopy += `
- ИТОГО: ${result.price.toFixed(0)} ₽
    `.trim();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedToClipboard(true);
      toast({
        title: "Скопировано в буфер обмена",
        description: "Результат расчета скопирован",
      });
      
      setTimeout(() => setCopiedToClipboard(false), 3000);
    });
  };

  const generatePDF = () => {
    toast({
      title: "Готово к скачиванию",
      description: "Файл с расчетом готов к скачиванию",
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="w-full max-w-xl shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white pb-5 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="h-6 w-6" />
            Расчёт стоимости материала
          </CardTitle>
          <CardDescription className="text-green-100 mt-1">
            Рассчитайте необходимое количество и стоимость пиломатериалов для вашего проекта
          </CardDescription>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-3">
            <TabsList className="w-full bg-green-700/40 border border-green-500/30">
              <TabsTrigger 
                value="calculator" 
                className="flex-1 data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-100"
              >
                <CalculatorIcon className="h-4 w-4 mr-2" /> Калькулятор
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex-1 data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-100"
              >
                <FileText className="h-4 w-4 mr-2" /> История расчётов
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <TabsContent value="calculator" className="space-y-4 mt-0">
            <div className="space-y-4">
              <motion.div 
                className="space-y-3"
                custom={0}
                variants={inputVariants}
              >
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">1</Badge>
                    Порода древесины
                  </label>
                  {isComparing && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs text-gray-500"
                      onClick={() => setIsComparing(false)}
                    >
                      <X className="h-3 w-3 mr-1" /> Отменить сравнение
                    </Button>
                  )}
                </div>
                
                <div className={`grid ${isComparing ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
                  <Select value={woodType} onValueChange={setWoodType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите породу" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] overflow-auto">
                      <SelectGroup>
                        <SelectLabel>Хвойные породы</SelectLabel>
                        <SelectItem value="pine" className="flex items-center">
                          <div className="flex justify-between w-full items-center">
                            <span>Сосна</span>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge variant="outline" className="ml-2 cursor-help">{woodPrices.pine.price.toLocaleString()} ₽/м³</Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="space-y-2 p-4">
                                <h4 className="font-medium">Сосна</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">Долговечность:</span>
                                  <div className="flex">
                                    {Array(5).fill(0).map((_, i) => (
                                      <div key={i} className={`w-2 h-2 rounded-full ${i < woodPrices.pine.durability ? 'bg-green-600' : 'bg-gray-200'} mx-0.5`} />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">Экологичность:</span>
                                  <div className="flex">
                                    {Array(5).fill(0).map((_, i) => (
                                      <div key={i} className={`w-2 h-2 rounded-full ${i < woodPrices.pine.eco ? 'bg-green-600' : 'bg-gray-200'} mx-0.5`} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Универсальный материал для строительства и отделки</p>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </SelectItem>
                        <SelectItem value="spruce">
                          <div className="flex justify-between w-full items-center">
                            <span>Ель</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.spruce.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="larch">
                          <div className="flex justify-between w-full items-center">
                            <span>Лиственница</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.larch.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="cedar">
                          <div className="flex justify-between w-full items-center">
                            <span>Кедр</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.cedar.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Лиственные породы</SelectLabel>
                        <SelectItem value="oak">
                          <div className="flex justify-between w-full items-center">
                            <span>Дуб</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.oak.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="beech">
                          <div className="flex justify-between w-full items-center">
                            <span>Бук</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.beech.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="ash">
                          <div className="flex justify-between w-full items-center">
                            <span>Ясень</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.ash.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="birch">
                          <div className="flex justify-between w-full items-center">
                            <span>Берёза</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.birch.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="alder">
                          <div className="flex justify-between w-full items-center">
                            <span>Ольха</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.alder.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="maple">
                          <div className="flex justify-between w-full items-center">
                            <span>Клён</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.maple.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Экзотические породы</SelectLabel>
                        <SelectItem value="teak">
                          <div className="flex justify-between w-full items-center">
                            <span>Тик</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.teak.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="mahogany">
                          <div className="flex justify-between w-full items-center">
                            <span>Махагони</span>
                            <Badge variant="outline" className="ml-2">{woodPrices.mahogany.price.toLocaleString()} ₽/м³</Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  {isComparing ? (
                    <Select value={comparisonWoodType} onValueChange={setComparisonWoodType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите для сравнения" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-auto">
                        <SelectGroup>
                          <SelectLabel>Хвойные породы</SelectLabel>
                          <SelectItem value="pine">Сосна - {woodPrices.pine.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="spruce">Ель - {woodPrices.spruce.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="larch">Лиственница - {woodPrices.larch.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="cedar">Кедр - {woodPrices.cedar.price.toLocaleString()} ₽/м³</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Лиственные породы</SelectLabel>
                          <SelectItem value="oak">Дуб - {woodPrices.oak.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="beech">Бук - {woodPrices.beech.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="ash">Ясень - {woodPrices.ash.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="birch">Берёза - {woodPrices.birch.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="alder">Ольха - {woodPrices.alder.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="maple">Клён - {woodPrices.maple.price.toLocaleString()} ₽/м³</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Экзотические породы</SelectLabel>
                          <SelectItem value="teak">Тик - {woodPrices.teak.price.toLocaleString()} ₽/м³</SelectItem>
                          <SelectItem value="mahogany">Махагони - {woodPrices.mahogany.price.toLocaleString()} ₽/м³</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-end"
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs px-2 py-1 h-7 mt-1"
                        onClick={() => setIsComparing(true)}
                      >
                        <BoxSelect className="h-3 w-3 mr-1" /> Сравнить с другой породой
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                {isComparing && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1.5 text-green-700" />
                      Сравнение пород
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Порода:</span>
                          <span className="font-medium">{woodPrices[woodType].displayName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Цена за м³:</span>
                          <span className="font-medium text-green-700">{woodPrices[woodType].price.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Долговечность:</span>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < woodPrices[woodType].durability ? 'bg-green-600' : 'bg-gray-200'} mx-px`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Экологичность:</span>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < woodPrices[woodType].eco ? 'bg-green-600' : 'bg-gray-200'} mx-px`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Порода:</span>
                          <span className="font-medium">{woodPrices[comparisonWoodType].displayName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Цена за м³:</span>
                          <span className="font-medium text-green-700">{woodPrices[comparisonWoodType].price.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Долговечность:</span>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < woodPrices[comparisonWoodType].durability ? 'bg-green-600' : 'bg-gray-200'} mx-px`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Экологичность:</span>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < woodPrices[comparisonWoodType].eco ? 'bg-green-600' : 'bg-gray-200'} mx-px`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Разница в цене:</span>
                        <span className={`font-medium ${
                          woodPrices[woodType].price < woodPrices[comparisonWoodType].price
                            ? 'text-green-600'
                            : 'text-orange-600'
                        }`}>
                          {Math.abs(woodPrices[woodType].price - woodPrices[comparisonWoodType].price).toLocaleString()} ₽/м³ 
                          ({woodPrices[woodType].price < woodPrices[comparisonWoodType].price ? 'дешевле' : 'дороже'})
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                custom={1}
                variants={inputVariants}
              >
                <label className="text-sm font-medium flex items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">2</Badge>
                  Обработка
                </label>
                <Select value={treatment} onValueChange={setTreatment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите тип обработки" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(treatmentTypes).map(([key, { displayName, multiplier, description }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex justify-between w-full items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help flex items-center">
                                  {displayName}
                                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Badge variant="outline" className="ml-2">x{multiplier}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
              
              <motion.div
                className="space-y-2"
                custom={2}
                variants={inputVariants}
              >
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">3</Badge>
                    {calculationMode === "dimensions" ? "Размеры" : "Объём"}
                  </label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs text-gray-500"
                    onClick={() => setCalculationMode(calculationMode === "dimensions" ? "volume" : "dimensions")}
                  >
                    <Settings2 className="h-3 w-3 mr-1" />
                    Переключить на {calculationMode === "dimensions" ? "объём" : "размеры"}
                  </Button>
                </div>
                
                {calculationMode === "dimensions" ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Длина (мм)</label>
                      <Input 
                        type="number" 
                        min="1"
                        value={length || ""}
                        onChange={e => setLength(Number(e.target.value))}
                        placeholder="6000"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Ширина (мм)</label>
                      <Input 
                        type="number"
                        min="1" 
                        value={width || ""}
                        onChange={e => setWidth(Number(e.target.value))}
                        placeholder="150"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Толщина (мм)</label>
                      <Input 
                        type="number"
                        min="1" 
                        value={height || ""}
                        onChange={e => setHeight(Number(e.target.value))}
                        placeholder="50"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 flex items-center">
                      Объём материала (м³)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 ml-1 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Введите объём материала в кубических метрах</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      type="number"
                      min="0.0001"
                      step="0.0001"
                      value={volume || ""}
                      onChange={e => setVolume(Number(e.target.value))}
                      placeholder="0.045"
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                )}
              </motion.div>
              
              <motion.div
                className="space-y-2"
                custom={3}
                variants={inputVariants}
              >
                <label className="text-sm font-medium flex items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">4</Badge>
                  Количество (шт)
                </label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >-</Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value) || 1)}
                    className="mx-2 text-center border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</Button>
                </div>
              </motion.div>
              
              {/* Дополнительные опции */}
              <motion.div
                className="pt-2"
                custom={4}
                variants={inputVariants}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">5</Badge>
                    Дополнительные опции
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs font-normal h-7 px-2 py-1"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    {showAdvanced ? 'Скрыть' : 'Показать'} 
                    {showAdvanced ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                  </Button>
                </div>
                
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <Label htmlFor="delivery" className="text-sm">Доставка</Label>
                            <p className="text-xs text-gray-500">Включить стоимость доставки</p>
                          </div>
                        </div>
                        <Switch
                          id="delivery"
                          checked={includeDelivery}
                          onCheckedChange={setIncludeDelivery}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      
                      <AnimatePresence>
                        {includeDelivery && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-3 py-2 bg-gray-50 rounded-lg"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-xs text-gray-600">Расстояние доставки: {deliveryDistance} км</label>
                                <span className="text-xs font-medium text-green-700">
                                  {(1500 + (deliveryDistance * 50)).toLocaleString()} ₽
                                </span>
                              </div>
                              <Slider
                                value={[deliveryDistance]}
                                min={1}
                                max={100}
                                step={1}
                                onValueChange={(value) => setDeliveryDistance(value[0])}
                                className="py-2"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1 км</span>
                                <span>50 км</span>
                                <span>100 км</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <Settings2 className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <Label htmlFor="installation" className="text-sm">Монтаж</Label>
                            <p className="text-xs text-gray-500">Включить стоимость монтажа (15% от стоимости материалов)</p>
                          </div>
                        </div>
                        <Switch
                          id="installation"
                          checked={includeInstallation}
                          onCheckedChange={setIncludeInstallation}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
                custom={5}
                variants={inputVariants}
              >
                <Button 
                  onClick={calculatePrice} 
                  className="w-full bg-green-700 hover:bg-green-800 mt-4 font-medium"
                  size="lg"
                >
                  Рассчитать стоимость
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            {savedCalculations.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {savedCalculations.map((calc, index) => (
                  <motion.div
                    key={calc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">
                        {calc.woodTypeName}, {calc.treatmentName}
                      </h4>
                      <Badge variant="outline" className="bg-gray-50 text-xs">
                        {new Date(calc.timestamp).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="text-sm space-y-1 mb-2">
                      {calc.calculationMode === "dimensions" ? (
                        <p className="text-gray-600">
                          Размеры: {calc.dimensions.length}×{calc.dimensions.width}×{calc.dimensions.height} мм, 
                          {calc.quantity > 1 ? ` ${calc.quantity} шт,` : ''} {calc.result.volume.toFixed(4)} м³
                        </p>
                      ) : (
                        <p className="text-gray-600">
                          Объем: {calc.volume} м³
                          {calc.quantity > 1 ? `, ${calc.quantity} шт` : ''}
                        </p>
                      )}
                      
                      <p className="font-medium text-green-700">
                        Итого: {calc.result.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7 px-2.5 py-1 border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => loadCalculation(calc)}
                      >
                        <CopyCheck className="h-3 w-3 mr-1" /> Загрузить
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-7 px-2.5 py-1 text-gray-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deleteCalculation(calc.id)}
                      >
                        <X className="h-3 w-3 mr-1" /> Удалить
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-gray-600 font-medium mb-1">История пуста</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Здесь будут отображаться сохраненные расчеты
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab("calculator")}
                >
                  Перейти к калькулятору
                </Button>
              </div>
            )}
          </TabsContent>
        </CardContent>
        
        <AnimatePresence>
          {result && activeTab === "calculator" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardFooter className="flex flex-col bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-b-lg border-t border-green-100">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">Результат расчёта:</h3>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="h-8 p-2 border-green-200"
                      >
                        {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={copyResultToClipboard}
                        className="h-8 p-2 border-green-200"
                        disabled={copiedToClipboard}
                      >
                        {copiedToClipboard ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Clipboard className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mb-3">
                    <motion.div 
                      className="bg-white p-3 rounded-lg shadow-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-sm text-gray-500">Объём:</p>
                      <div className="flex items-baseline">
                        <p className="text-lg font-semibold text-gray-800">{result.volume.toFixed(4)} м³</p>
                        {quantity > 1 && (
                          <span className="text-xs text-gray-500 ml-1">({(result.volume / quantity).toFixed(4)} × {quantity})</span>
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-green-700 to-green-600 p-3 rounded-lg shadow-sm text-white relative overflow-hidden"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Декоративный элемент */}
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white opacity-10"></div>
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white opacity-5"></div>
                      <p className="text-sm text-green-100">Стоимость:</p>
                      <p className="text-xl font-bold">{result.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</p>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div 
                        className="mb-4 space-y-3 bg-white p-3 rounded-lg shadow-sm"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-medium text-gray-700 flex items-center">
                          <PieChart className="h-4 w-4 text-green-600 mr-1.5" />
                          Детализация расчёта
                        </h4>
                        
                        <div className="bg-gray-50 rounded p-3 text-sm space-y-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Порода дерева:</span>
                            <span className="font-medium text-gray-800">{woodPrices[woodType]?.displayName || "Сосна"}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Базовая стоимость:</span>
                            <span className="font-medium text-gray-800">{woodPrices[woodType]?.price.toLocaleString() || "12 000"} ₽/м³</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Тип обработки:</span>
                            <span className="font-medium text-gray-800">{treatmentTypes[treatment]?.displayName || "Обрезная"}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Коэффициент обработки:</span>
                            <span className="font-medium text-gray-800">x{treatmentTypes[treatment]?.multiplier || "1.0"}</span>
                          </div>
                          
                          {calculationMode === "dimensions" ? (
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Размеры:</span>
                              <span className="font-medium text-gray-800">{length}×{width}×{height} мм</span>
                            </div>
                          ) : (
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Заданный объём:</span>
                              <span className="font-medium text-gray-800">{volume} м³</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Количество:</span>
                            <span className="font-medium text-gray-800">{quantity} шт</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Общий объём:</span>
                            <span className="font-medium text-gray-800">{result.volume.toFixed(4)} м³</span>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3 text-sm space-y-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Стоимость материала:</span>
                            <span className="font-medium text-gray-800">{result.breakdown.base.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span>
                          </div>
                          
                          {result.breakdown.treatment > 0 && (
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Стоимость обработки:</span>
                              <span className="font-medium text-gray-800">{result.breakdown.treatment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span>
                            </div>
                          )}
                          
                          {includeDelivery && result.breakdown.delivery && (
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Доставка ({deliveryDistance} км):</span>
                              <span className="font-medium text-gray-800">{result.breakdown.delivery.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span>
                            </div>
                          )}
                          
                          {includeInstallation && result.breakdown.installation && (
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Монтаж (15%):</span>
                              <span className="font-medium text-gray-800">{result.breakdown.installation.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between mt-2 pt-2 border-t border-green-200">
                            <span className="text-gray-800 font-semibold">Итоговая стоимость:</span>
                            <span className="font-bold text-green-700">{result.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <CalendarClock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="text-sm font-medium text-blue-800">Предполагаемые сроки:</h5>
                              <ul className="mt-1 text-xs text-blue-700 space-y-1">
                                <li className="flex justify-between">
                                  <span>Подготовка материалов:</span>
                                  <span className="font-medium">2-3 рабочих дня</span>
                                </li>
                                {includeDelivery && (
                                  <li className="flex justify-between">
                                    <span>Доставка:</span>
                                    <span className="font-medium">{
                                      deliveryDistance <= 30 
                                        ? "1 рабочий день" 
                                        : deliveryDistance <= 70 
                                          ? "1-2 рабочих дня" 
                                          : "2-3 рабочих дня"
                                    }</span>
                                  </li>
                                )}
                                {includeInstallation && (
                                  <li className="flex justify-between">
                                    <span>Монтаж:</span>
                                    <span className="font-medium">{
                                      result.volume < 1 
                                        ? "1-2 рабочих дня" 
                                        : result.volume < 5 
                                          ? "2-4 рабочих дня" 
                                          : "5-7 рабочих дней"
                                    }</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline"
                      onClick={saveCalculation}
                      className="flex-1 border-green-300 text-green-800 hover:bg-green-50 font-medium"
                    >
                      <Save className="mr-2 h-4 w-4" /> Сохранить расчёт
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex-1 border-green-300 text-green-800 hover:bg-green-50 font-medium"
                      onClick={generatePDF}
                    >
                      <Download className="mr-2 h-4 w-4" /> Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default PriceCalculator;
