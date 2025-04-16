
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
import { Calculator, ArrowRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [woodType, setWoodType] = useState<string>("pine");
  const [treatment, setTreatment] = useState<string>("standard");
  const [result, setResult] = useState<{ volume: number; price: number } | null>(null);

  const woodPrices: Record<string, number> = {
    pine: 12000, // цена за кубометр
    spruce: 11500,
    oak: 45000,
    beech: 38000,
    ash: 40000,
    birch: 25000,
    alder: 22000,
    teak: 85000,
    mahogany: 78000,
  };

  const treatmentMultipliers: Record<string, number> = {
    standard: 1,
    planed: 1.25,
    dried: 1.35,
    tongue_groove: 1.5,
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
    const basePrice = woodPrices[woodType] || woodPrices.pine;
    const multiplier = treatmentMultipliers[treatment] || treatmentMultipliers.standard;
    const price = basePrice * volume * multiplier;
    
    setResult({ volume, price });
    
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
      treatment,
      result
    };
    
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    savedCalculations.push(calculationData);
    localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    
    toast({
      title: "Расчёт сохранен",
      description: "Вы можете найти его в истории расчётов",
    });
  };

  return (
    <Card className="w-full max-w-xl shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          Расчёт стоимости материала
        </CardTitle>
        <CardDescription className="text-green-100">
          Рассчитайте необходимое количество и стоимость пиломатериалов для вашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Порода древесины</label>
          <Select value={woodType} onValueChange={setWoodType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите породу" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Хвойные породы</SelectLabel>
                <SelectItem value="pine">Сосна</SelectItem>
                <SelectItem value="spruce">Ель</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Лиственные породы</SelectLabel>
                <SelectItem value="oak">Дуб</SelectItem>
                <SelectItem value="beech">Бук</SelectItem>
                <SelectItem value="ash">Ясень</SelectItem>
                <SelectItem value="birch">Берёза</SelectItem>
                <SelectItem value="alder">Ольха</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Экзотические породы</SelectLabel>
                <SelectItem value="teak">Тик</SelectItem>
                <SelectItem value="mahogany">Махагони</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Обработка</label>
          <Select value={treatment} onValueChange={setTreatment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тип обработки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Обрезная</SelectItem>
              <SelectItem value="planed">Строганная</SelectItem>
              <SelectItem value="dried">Сухая</SelectItem>
              <SelectItem value="tongue_groove">Шпунтованная</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Длина (мм)</label>
            <Input 
              type="number" 
              min="1"
              value={length || ""}
              onChange={e => setLength(Number(e.target.value))}
              placeholder="6000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ширина (мм)</label>
            <Input 
              type="number"
              min="1" 
              value={width || ""}
              onChange={e => setWidth(Number(e.target.value))}
              placeholder="150"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Толщина (мм)</label>
            <Input 
              type="number"
              min="1" 
              value={height || ""}
              onChange={e => setHeight(Number(e.target.value))}
              placeholder="50"
            />
          </div>
        </div>
        
        <Button 
          onClick={calculatePrice} 
          className="w-full bg-green-600 hover:bg-green-700 mt-4 font-medium"
          size="lg"
        >
          Рассчитать стоимость
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
      
      {result && (
        <CardFooter className="flex flex-col bg-green-50 p-4 rounded-b-lg border-t border-green-100">
          <div className="grid grid-cols-2 gap-4 w-full mb-3">
            <div>
              <p className="text-sm text-gray-500">Объём:</p>
              <p className="text-lg font-semibold">{result.volume.toFixed(4)} м³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Стоимость:</p>
              <p className="text-xl font-bold text-green-700">{result.price.toFixed(0)} ₽</p>
            </div>
          </div>
          <Button 
            variant="outline"
            onClick={saveCalculation}
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            <Save className="mr-2 h-4 w-4" /> Сохранить расчёт
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PriceCalculator;
