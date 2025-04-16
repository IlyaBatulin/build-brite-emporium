
import { useState, useRef, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cube, RotateCcw, Home, Info, ArrowRight, Axe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Parts of a house that can be selected
type HousePart = "foundation" | "walls" | "roof" | "floor" | "windows" | "doors" | "deck" | "fence";

interface PartInfo {
  name: string;
  description: string;
  materials: {
    name: string;
    category: string;
    image: string;
  }[];
}

const HouseVisualizer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePart, setActivePart] = useState<HousePart | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Mapping of house parts to their materials info
  const partsInfo: Record<HousePart, PartInfo> = {
    foundation: {
      name: "Фундамент",
      description: "Основа любой постройки, определяет прочность конструкции",
      materials: [
        {
          name: "Брус обрезной 150x150 мм",
          category: "Обрезной пиломатериал",
          image: "https://images.unsplash.com/photo-1504484656217-38f8ffc617f9?auto=format&fit=crop&q=80&w=300"
        },
        {
          name: "Доска обрезная 50x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    walls: {
      name: "Стены",
      description: "Формируют внешний контур и внутреннее пространство дома",
      materials: [
        {
          name: "Брус профилированный 190x140 мм",
          category: "Брус профилированный",
          image: "https://images.unsplash.com/photo-1584417031970-04f412fac596?auto=format&fit=crop&q=80&w=300"
        },
        {
          name: "Блок-хаус 20x140 мм",
          category: "Блок-хаус",
          image: "https://images.unsplash.com/photo-1606040379749-24da4a6b8924?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    roof: {
      name: "Крыша",
      description: "Верхняя часть конструкции, защищающая от осадков",
      materials: [
        {
          name: "Доска обрезная 25x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1620705811053-7d6947c576ff?auto=format&fit=crop&q=80&w=300"
        },
        {
          name: "Брусок строганный 50x50 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1601289126034-82a05f13f053?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    floor: {
      name: "Пол",
      description: "Горизонтальная поверхность для передвижения и размещения мебели",
      materials: [
        {
          name: "Доска половая 28x140 мм",
          category: "Шпунтованная доска",
          image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=300"
        },
        {
          name: "Фанера ФСФ 18 мм",
          category: "Фанера ФСФ",
          image: "https://images.unsplash.com/photo-1516333707343-720c180e3f6e?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    windows: {
      name: "Окна",
      description: "Элементы остекления для естественного освещения помещений",
      materials: [
        {
          name: "Брусок строганный 70x70 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1606043633058-677cb97996cf?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    doors: {
      name: "Двери",
      description: "Вход и выход из помещения, разделение пространства",
      materials: [
        {
          name: "Брус строганный 100x45 мм",
          category: "Сухой строганный брус",
          image: "https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    deck: {
      name: "Терраса",
      description: "Открытая площадка, примыкающая к дому",
      materials: [
        {
          name: "Террасная доска 28x140 мм",
          category: "Террасная доска",
          image: "https://images.unsplash.com/photo-1639143906824-5852428a1490?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    fence: {
      name: "Забор",
      description: "Ограждение территории вокруг дома",
      materials: [
        {
          name: "Планкен 20x140 мм",
          category: "Планкен",
          image: "https://images.unsplash.com/photo-1581515286943-8d1ca5f740c1?auto=format&fit=crop&q=80&w=300"
        }
      ]
    }
  };

  // Initialize ThreeJS scene
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    // Placeholder for ThreeJS initialization
    // Here would be the code for creating a 3D house model
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // For now, we'll just draw a placeholder house
    const drawHouse = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set canvas size
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Draw foundation
      context.fillStyle = activePart === 'foundation' ? '#9b87f5' : '#999';
      context.fillRect(50, 280, 300, 20);
      
      // Draw walls
      context.fillStyle = activePart === 'walls' ? '#9b87f5' : '#e5deff';
      context.fillRect(70, 150, 260, 130);
      
      // Draw roof
      context.fillStyle = activePart === 'roof' ? '#9b87f5' : '#D6BCFA';
      context.beginPath();
      context.moveTo(50, 150);
      context.lineTo(200, 80);
      context.lineTo(350, 150);
      context.closePath();
      context.fill();
      
      // Draw door
      context.fillStyle = activePart === 'doors' ? '#9b87f5' : '#6E59A5';
      context.fillRect(170, 220, 60, 90);
      
      // Draw windows
      context.fillStyle = activePart === 'windows' ? '#9b87f5' : '#7E69AB';
      context.fillRect(100, 200, 50, 50);
      context.fillRect(250, 200, 50, 50);
      
      // Draw floor
      context.fillStyle = activePart === 'floor' ? '#9b87f5' : '#8E9196';
      context.fillRect(70, 260, 260, 10);
      
      // Draw deck
      context.fillStyle = activePart === 'deck' ? '#9b87f5' : '#F2FCE2';
      context.fillRect(250, 280, 120, 20);
      
      // Draw fence
      context.fillStyle = activePart === 'fence' ? '#9b87f5' : '#FEF7CD';
      for (let i = 20; i <= 380; i += 20) {
        if (i < 140 || i > 240) 
          context.fillRect(i, 290, 5, 30);
      }
      
      // Add labels with arrows to different parts
      context.font = '12px Arial';
      context.fillStyle = '#333';
      
      // Foundation label
      drawLabelWithArrow(context, 'Фундамент', 40, 320, 100, 290);
      
      // Walls label
      drawLabelWithArrow(context, 'Стены', 30, 190, 70, 200);
      
      // Roof label
      drawLabelWithArrow(context, 'Крыша', 360, 110, 330, 140);
      
      // Door label
      drawLabelWithArrow(context, 'Двери', 250, 260, 210, 250);
      
      // Windows label
      drawLabelWithArrow(context, 'Окна', 130, 180, 120, 195);
      
      // Floor label
      drawLabelWithArrow(context, 'Пол', 350, 250, 330, 260);
      
      // Deck label
      drawLabelWithArrow(context, 'Терраса', 310, 320, 300, 290);
      
      // Fence label
      drawLabelWithArrow(context, 'Забор', 390, 310, 370, 300);
    };

    function drawLabelWithArrow(ctx: CanvasRenderingContext2D, text: string, textX: number, textY: number, arrowX: number, arrowY: number) {
      ctx.fillText(text, textX, textY);
      ctx.beginPath();
      ctx.moveTo(textX + 5, textY - 5);
      ctx.lineTo(arrowX, arrowY);
      ctx.stroke();
    }
    
    drawHouse();
    
    // Add event listeners for interaction
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check what part was clicked
      if (y > 280 && y < 300 && x > 50 && x < 350) {
        // Foundation was clicked
        handlePartSelect('foundation');
      } else if (y > 150 && y < 280 && x > 70 && x < 330) {
        // Walls were clicked
        handlePartSelect('walls');
      } else if (y > 80 && y < 150 && x > 50 && x < 350 && 
                ((y > -0.35*x + 150) && (y < 0.35*x + 10))) {
        // Roof was clicked
        handlePartSelect('roof');
      } else if (y > 220 && y < 310 && x > 170 && x < 230) {
        // Door was clicked
        handlePartSelect('doors');
      } else if (((y > 200 && y < 250 && x > 100 && x < 150) || 
                 (y > 200 && y < 250 && x > 250 && x < 300))) {
        // Windows were clicked
        handlePartSelect('windows');
      } else if (y > 260 && y < 270 && x > 70 && x < 330) {
        // Floor was clicked
        handlePartSelect('floor');
      } else if (y > 280 && y < 300 && x > 250 && x < 370) {
        // Deck was clicked
        handlePartSelect('deck');
      } else if (y > 290 && y < 320) {
        // Fence was clicked
        handlePartSelect('fence');
      }
    };
    
    canvas.addEventListener('click', handleCanvasClick);
    
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activePart, isVisible]);
  
  const handlePartSelect = (part: HousePart) => {
    setActivePart(part);
    toast({
      title: `Выбрано: ${partsInfo[part].name}`,
      description: partsInfo[part].description,
    });
  };
  
  const goToCatalogWithFilter = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  return (
    <Card className="w-full shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-6 w-6" /> Интерактивная модель дома
            </CardTitle>
            <CardDescription className="text-green-100">
              Нажмите на различные части дома, чтобы увидеть подходящие материалы
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setActivePart(null)}
            className="border-green-300 bg-green-700/20 text-white hover:bg-green-700/40 hover:text-white"
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Сброс
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 bg-white p-4 min-h-[400px] flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              className="w-full max-w-lg h-[400px] cursor-pointer shadow-inner bg-gray-50 rounded-lg"
            />
          </div>
          
          <div className="md:col-span-2 border-l border-gray-100 p-4 max-h-[400px] overflow-y-auto">
            {activePart ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                    <Cube className="h-5 w-5 text-green-600" />
                    {partsInfo[activePart].name}
                  </h3>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    {partsInfo[activePart].materials.length} вида материалов
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {partsInfo[activePart].description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800 flex items-center gap-2">
                    <Axe className="h-4 w-4 text-green-600" />
                    Подходящие материалы:
                  </h4>
                  
                  {partsInfo[activePart].materials.map((material, index) => (
                    <div key={index} className="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={material.image} 
                          alt={material.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <h5 className="font-medium text-gray-800">{material.name}</h5>
                          <p className="text-xs text-gray-500">{material.category}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-2 bg-green-600 hover:bg-green-700 w-full"
                          onClick={() => goToCatalogWithFilter(material.category)}
                        >
                          В каталог <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Info className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Выберите часть дома</h3>
                <p className="text-gray-600">
                  Нажмите на интересующую вас часть дома на модели слева, 
                  чтобы увидеть подходящие для неё материалы из нашего каталога.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseVisualizer;
