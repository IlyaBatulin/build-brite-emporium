
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
import { Calculator, ArrowRight, Save, PieChart, BarChart, Check, ChevronDown, ChevronUp, Download, Share2, Clipboard, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const PriceCalculator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [woodType, setWoodType] = useState<string>("pine");
  const [treatment, setTreatment] = useState<string>("standard");
  const [result, setResult] = useState<{ volume: number; price: number; breakdown: { base: number; treatment: number } } | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const woodPrices: Record<string, { price: number; displayName: string }> = {
    pine: { price: 12000, displayName: "Сосна" },
    spruce: { price: 11500, displayName: "Ель" },
    oak: { price: 45000, displayName: "Дуб" },
    beech: { price: 38000, displayName: "Бук" },
    ash: { price: 40000, displayName: "Ясень" },
    birch: { price: 25000, displayName: "Берёза" },
    alder: { price: 22000, displayName: "Ольха" },
    teak: { price: 85000, displayName: "Тик" },
    mahogany: { price: 78000, displayName: "Махагони" },
  };

  const treatmentTypes: Record<string, { multiplier: number; displayName: string }> = {
    standard: { multiplier: 1, displayName: "Обрезная" },
    planed: { multiplier: 1.25, displayName: "Строганная" },
    dried: { multiplier: 1.35, displayName: "Сухая" },
    tongue_groove: { multiplier: 1.5, displayName: "Шпунтованная" },
  };

  const calculatePrice = () => {
    if (!length || !width || !height) {
      toast({
        title: "Ошибка расчёта",
        description: "Пожалуйста, заполните все размеры",
        variant: "destructive"
      });
      return;
    }
    
    // Вычисляем объём в кубометрах (переводим из мм в м)
    const volume = (length * width * height) / 1000000000;
    const basePrice = woodPrices[woodType]?.price || woodPrices.pine.price;
    const multiplier = treatmentTypes[treatment]?.multiplier || treatmentTypes.standard.multiplier;
    
    const baseCost = basePrice * volume;
    const treatmentCost = baseCost * (multiplier - 1);
    const totalPrice = baseCost + treatmentCost;
    
    setResult({ 
      volume, 
      price: totalPrice,
      breakdown: {
        base: baseCost,
        treatment: treatmentCost
      }
    });
    
    toast({
      title: "Расчёт выполнен",
      description: "Стоимость материала рассчитана",
    });
  };

  const saveCalculation = () => {
    if (!result) return;
    
    const calculationData = {
      dimensions: { length, width, height },
      woodType,
      woodTypeName: woodPrices[woodType]?.displayName,
      treatment,
      treatmentName: treatmentTypes[treatment]?.displayName,
      result,
      timestamp: new Date().toISOString()
    };
    
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    savedCalculations.push(calculationData);
    localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    
    toast({
      title: "Расчёт сохранен",
      description: "Вы можете найти его в истории расчётов",
    });
  };

  const copyResultToClipboard = () => {
    if (!result) return;
    
    const woodName = woodPrices[woodType]?.displayName || "Сосна";
    const treatmentName = treatmentTypes[treatment]?.displayName || "Обрезная";
    
    const textToCopy = `
Расчет стоимости пиломатериала:
- Порода дерева: ${woodName}
- Обработка: ${treatmentName}
- Размеры: ${length}x${width}x${height} мм
- Объем: ${result.volume.toFixed(4)} м³
- Стоимость: ${result.price.toFixed(0)} ₽
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

  return (
    <Card className="w-full max-w-xl shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white pb-4 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-6 w-6" />
          Расчёт стоимости материала
        </CardTitle>
        <CardDescription className="text-green-100 mt-1">
          Рассчитайте необходимое количество и стоимость пиломатериалов для вашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5">
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">1</Badge>
            Порода древесины
          </label>
          <Select value={woodType} onValueChange={setWoodType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите породу" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                <SelectLabel>Хвойные породы</SelectLabel>
                <SelectItem value="pine" className="flex items-center">
                  <div className="flex justify-between w-full items-center">
                    <span>Сосна</span>
                    <Badge variant="outline" className="ml-2">{woodPrices.pine.price.toLocaleString()} ₽/м³</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="spruce">
                  <div className="flex justify-between w-full items-center">
                    <span>Ель</span>
                    <Badge variant="outline" className="ml-2">{woodPrices.spruce.price.toLocaleString()} ₽/м³</Badge>
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
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5">
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">2</Badge>
            Обработка
          </label>
          <Select value={treatment} onValueChange={setTreatment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тип обработки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">
                <div className="flex justify-between w-full items-center">
                  <span>Обрезная</span>
                  <Badge variant="outline" className="ml-2">x{treatmentTypes.standard.multiplier}</Badge>
                </div>
              </SelectItem>
              <SelectItem value="planed">
                <div className="flex justify-between w-full items-center">
                  <span>Строганная</span>
                  <Badge variant="outline" className="ml-2">x{treatmentTypes.planed.multiplier}</Badge>
                </div>
              </SelectItem>
              <SelectItem value="dried">
                <div className="flex justify-between w-full items-center">
                  <span>Сухая</span>
                  <Badge variant="outline" className="ml-2">x{treatmentTypes.dried.multiplier}</Badge>
                </div>
              </SelectItem>
              <SelectItem value="tongue_groove">
                <div className="flex justify-between w-full items-center">
                  <span>Шпунтованная</span>
                  <Badge variant="outline" className="ml-2">x{treatmentTypes.tongue_groove.multiplier}</Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5">
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">3</Badge>
            Размеры
          </label>
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
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6"
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
      </CardContent>
      
      <AnimatePresence>
        {result && (
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
                    <p className="text-lg font-semibold text-gray-800">{result.volume.toFixed(4)} м³</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-green-700 to-green-600 p-3 rounded-lg shadow-sm text-white"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-sm text-green-100">Стоимость:</p>
                    <p className="text-xl font-bold">{result.price.toFixed(0)} ₽</p>
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
                      <h4 className="font-medium text-gray-700 flex items-center gap-1">
                        <PieChart className="h-4 w-4 text-green-600" />
                        Детализация расчёта
                      </h4>
                      
                      <div className="bg-gray-50 rounded p-2 text-sm">
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
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Размеры:</span>
                          <span className="font-medium text-gray-800">{length}x{width}x{height} мм</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Объём:</span>
                          <span className="font-medium text-gray-800">{result.volume.toFixed(4)} м³</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded p-2 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Стоимость материала:</span>
                          <span className="font-medium text-gray-800">{result.breakdown.base.toFixed(0)} ₽</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Стоимость обработки:</span>
                          <span className="font-medium text-gray-800">{result.breakdown.treatment.toFixed(0)} ₽</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-green-200">
                          <span className="text-gray-800 font-semibold">Итоговая стоимость:</span>
                          <span className="font-bold text-green-700">{result.price.toFixed(0)} ₽</span>
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
                    onClick={() => {
                      // Placeholder for PDF functionality
                      toast({
                        title: "Готово к скачиванию",
                        description: "Файл с расчетом готов к скачиванию",
                      });
                    }}
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
  );
};

export default PriceCalculator;
