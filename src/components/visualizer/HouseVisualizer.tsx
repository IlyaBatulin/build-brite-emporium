
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
import { Cuboid, RotateCcw, Home, Info, ArrowRight, Axe, CheckCircle2, Ruler, PanelTop, Warehouse, DoorOpen, LayoutGrid, Fence } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type HousePart = "foundation" | "walls" | "roof" | "floor" | "windows" | "doors" | "deck" | "fence";

interface PartInfo {
  name: string;
  description: string;
  icon: React.ReactNode;
  materials: {
    name: string;
    category: string;
    image: string;
    price?: number;
  }[];
}

const HouseVisualizer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePart, setActivePart] = useState<HousePart | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);

  const partsInfo: Record<HousePart, PartInfo> = {
    foundation: {
      name: "Фундамент",
      description: "Основа любой постройки, определяет прочность конструкции",
      icon: <Warehouse className="h-5 w-5 text-amber-600" />,
      materials: [
        {
          name: "Брус обрезной 150x150 мм",
          category: "Обрезной пиломатериал",
          image: "https://images.unsplash.com/photo-1504484656217-38f8ffc617f9?auto=format&fit=crop&q=80&w=300",
          price: 12500
        },
        {
          name: "Доска обрезная 50x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300",
          price: 9800
        }
      ]
    },
    walls: {
      name: "Стены",
      description: "Формируют внешний контур и внутреннее пространство дома",
      icon: <PanelTop className="h-5 w-5 text-emerald-600" />,
      materials: [
        {
          name: "Брус профилированный 190x140 мм",
          category: "Брус профилированный",
          image: "https://images.unsplash.com/photo-1584417031970-04f412fac596?auto=format&fit=crop&q=80&w=300",
          price: 18400
        },
        {
          name: "Блок-хаус 20x140 мм",
          category: "Блок-хаус",
          image: "https://images.unsplash.com/photo-1606040379749-24da4a6b8924?auto=format&fit=crop&q=80&w=300",
          price: 8900
        }
      ]
    },
    roof: {
      name: "Крыша",
      description: "Верхняя часть конструкции, защищающая от осадков",
      icon: <Home className="h-5 w-5 text-red-600" />,
      materials: [
        {
          name: "Доска обрезная 25x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1620705811053-7d6947c576ff?auto=format&fit=crop&q=80&w=300",
          price: 7600
        },
        {
          name: "Брусок строганный 50x50 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1601289126034-82a05f13f053?auto=format&fit=crop&q=80&w=300",
          price: 3500
        }
      ]
    },
    floor: {
      name: "Пол",
      description: "Горизонтальная поверхность для передвижения и размещения мебели",
      icon: <LayoutGrid className="h-5 w-5 text-blue-600" />,
      materials: [
        {
          name: "Доска половая 28x140 мм",
          category: "Шпунтованная доска",
          image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=300",
          price: 14200
        },
        {
          name: "Фанера ФСФ 18 мм",
          category: "Фанера ФСФ",
          image: "https://images.unsplash.com/photo-1516333707343-720c180e3f6e?auto=format&fit=crop&q=80&w=300",
          price: 11500
        }
      ]
    },
    windows: {
      name: "Окна",
      description: "Элементы остекления для естественного освещения помещений",
      icon: <Ruler className="h-5 w-5 text-violet-600" />,
      materials: [
        {
          name: "Брусок строганный 70x70 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1606043633058-677cb97996cf?auto=format&fit=crop&q=80&w=300",
          price: 6700
        }
      ]
    },
    doors: {
      name: "Двери",
      description: "Вход и выход из помещения, разделение пространства",
      icon: <DoorOpen className="h-5 w-5 text-cyan-600" />,
      materials: [
        {
          name: "Брус строганный 100x45 мм",
          category: "Сухой строганный брус",
          image: "https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&q=80&w=300",
          price: 8300
        }
      ]
    },
    deck: {
      name: "Терраса",
      description: "Открытая площадка, примыкающая к дому",
      icon: <Cuboid className="h-5 w-5 text-orange-600" />,
      materials: [
        {
          name: "Террасная доска 28x140 мм",
          category: "Террасная доска",
          image: "https://images.unsplash.com/photo-1639143906824-5852428a1490?auto=format&fit=crop&q=80&w=300",
          price: 16800
        }
      ]
    },
    fence: {
      name: "Забор",
      description: "Ограждение территории вокруг дома",
      icon: <Fence className="h-5 w-5 text-lime-600" />,
      materials: [
        {
          name: "Планкен 20x140 мм",
          category: "Планкен",
          image: "https://images.unsplash.com/photo-1581515286943-8d1ca5f740c1?auto=format&fit=crop&q=80&w=300",
          price: 9200
        }
      ]
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const drawHouse = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#e5f2ff');
      gradient.addColorStop(1, '#f7fbff');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      context.fillStyle = '#ffffff';
      drawCloud(context, 50, 60, 60, 30);
      drawCloud(context, 250, 40, 80, 25);
      
      // Draw sun
      const sunGradient = context.createRadialGradient(350, 60, 5, 350, 60, 30);
      sunGradient.addColorStop(0, 'rgba(255, 255, 190, 1)');
      sunGradient.addColorStop(1, 'rgba(255, 235, 150, 0.3)');
      context.fillStyle = sunGradient;
      context.beginPath();
      context.arc(350, 60, 25, 0, Math.PI * 2);
      context.fill();
      
      // Draw ground
      const groundGradient = context.createLinearGradient(0, canvas.height - 50, 0, canvas.height);
      groundGradient.addColorStop(0, '#81c784');
      groundGradient.addColorStop(1, '#66bb6a');
      context.fillStyle = groundGradient;
      context.fillRect(0, canvas.height - 50, canvas.width, 50);
      
      // Apply rotation if needed
      if (isRotating) {
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(rotation * Math.PI / 180);
        context.translate(-canvas.width / 2, -canvas.height / 2);
      }
      
      // Draw foundation shadow
      context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      context.beginPath();
      context.ellipse(200, 300, 160, 25, 0, 0, Math.PI * 2);
      context.fill();
      
      // Draw foundation
      const foundationGradient = context.createLinearGradient(50, 280, 350, 300);
      foundationGradient.addColorStop(0, activePart === 'foundation' ? '#9b87f5' : '#bbb');
      foundationGradient.addColorStop(1, activePart === 'foundation' ? '#ac9bf9' : '#999');
      context.fillStyle = foundationGradient;
      context.fillRect(50, 280, 300, 20);
      
      // Add foundation texture
      if (activePart !== 'foundation') {
        context.strokeStyle = '#888';
        context.lineWidth = 1;
        for (let i = 55; i < 350; i += 30) {
          context.beginPath();
          context.moveTo(i, 280);
          context.lineTo(i, 300);
          context.stroke();
        }
      }
      
      // Draw walls with gradient and texture
      const wallsGradient = context.createLinearGradient(70, 150, 330, 280);
      wallsGradient.addColorStop(0, activePart === 'walls' ? '#9b87f5' : '#e5deff');
      wallsGradient.addColorStop(1, activePart === 'walls' ? '#ac9bf9' : '#d6ccff');
      
      context.fillStyle = wallsGradient;
      context.fillRect(70, 150, 260, 130);
      
      // Add wall texture
      if (activePart !== 'walls') {
        context.strokeStyle = '#d6ccff';
        context.lineWidth = 1;
        for (let i = 170; i < 270; i += 20) {
          context.beginPath();
          context.moveTo(70, i);
          context.lineTo(330, i);
          context.stroke();
        }
      }
      
      // Draw roof with gradient
      const roofGradient = context.createLinearGradient(200, 80, 200, 150);
      roofGradient.addColorStop(0, activePart === 'roof' ? '#9b87f5' : '#D6BCFA');
      roofGradient.addColorStop(1, activePart === 'roof' ? '#ac9bf9' : '#c9a9f9');
      
      context.fillStyle = roofGradient;
      context.beginPath();
      context.moveTo(50, 150);
      context.lineTo(200, 80);
      context.lineTo(350, 150);
      context.closePath();
      context.fill();
      
      // Add roof texture
      if (activePart !== 'roof') {
        context.strokeStyle = '#c9a9f9';
        context.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          context.beginPath();
          context.moveTo(50 + i*50, 150);
          context.lineTo(200, 80);
          context.stroke();
        }
      }
      
      // Draw chimney
      context.fillStyle = activePart === 'roof' ? '#9b87f5' : '#A98AC0';
      context.fillRect(280, 95, 20, 40);
      
      // Draw door with gradient
      const doorGradient = context.createLinearGradient(170, 220, 230, 220);
      doorGradient.addColorStop(0, activePart === 'doors' ? '#9b87f5' : '#6E59A5');
      doorGradient.addColorStop(1, activePart === 'doors' ? '#ac9bf9' : '#795EB5');
      
      context.fillStyle = doorGradient;
      context.fillRect(170, 220, 60, 90);
      
      // Door handle
      context.fillStyle = '#FFD700';
      context.beginPath();
      context.arc(220, 265, 3, 0, Math.PI * 2);
      context.fill();
      
      // Draw windows with gradient
      const windowGradient = context.createLinearGradient(100, 200, 150, 250);
      windowGradient.addColorStop(0, activePart === 'windows' ? '#9b87f5' : '#7E69AB');
      windowGradient.addColorStop(1, activePart === 'windows' ? '#ac9bf9' : '#9178C5');
      
      context.fillStyle = windowGradient;
      
      // Left window
      context.fillRect(100, 200, 50, 50);
      
      // Right window
      context.fillRect(250, 200, 50, 50);
      
      // Window frames
      if (activePart !== 'windows') {
        context.strokeStyle = '#9284C5';
        context.lineWidth = 2;
        
        // Left window frame
        context.beginPath();
        context.moveTo(125, 200);
        context.lineTo(125, 250);
        context.stroke();
        
        context.beginPath();
        context.moveTo(100, 225);
        context.lineTo(150, 225);
        context.stroke();
        
        // Right window frame
        context.beginPath();
        context.moveTo(275, 200);
        context.lineTo(275, 250);
        context.stroke();
        
        context.beginPath();
        context.moveTo(250, 225);
        context.lineTo(300, 225);
        context.stroke();
      }
      
      // Draw floor
      context.fillStyle = activePart === 'floor' ? '#9b87f5' : '#8E9196';
      context.fillRect(70, 260, 260, 10);
      
      // Draw deck with gradient
      const deckGradient = context.createLinearGradient(250, 280, 370, 300);
      deckGradient.addColorStop(0, activePart === 'deck' ? '#9b87f5' : '#F2FCE2');
      deckGradient.addColorStop(1, activePart === 'deck' ? '#ac9bf9' : '#E5F9D5');
      
      context.fillStyle = deckGradient;
      context.fillRect(250, 280, 120, 20);
      
      // Deck texture
      if (activePart !== 'deck') {
        context.strokeStyle = '#D5E8C6';
        context.lineWidth = 1;
        for (let i = 255; i < 365; i += 15) {
          context.beginPath();
          context.moveTo(i, 280);
          context.lineTo(i, 300);
          context.stroke();
        }
      }
      
      // Draw fence with gradient
      const fenceGradient = context.createLinearGradient(20, 290, 20, 320);
      fenceGradient.addColorStop(0, activePart === 'fence' ? '#9b87f5' : '#FEF7CD');
      fenceGradient.addColorStop(1, activePart === 'fence' ? '#ac9bf9' : '#FCF0B0');
      
      context.fillStyle = fenceGradient;
      for (let i = 20; i <= 380; i += 20) {
        if (i < 140 || i > 240) 
          context.fillRect(i, 290, 5, 30);
      }
      
      if (isRotating) {
        context.restore();
      }
      
      // Draw labels with improved styling
      context.font = 'bold 12px Arial';
      
      // Draw arrows and labels with glow effect for better visibility
      drawLabelWithFancyArrow(context, 'Фундамент', 40, 320, 100, 290, activePart === 'foundation');
      drawLabelWithFancyArrow(context, 'Стены', 30, 190, 70, 200, activePart === 'walls');
      drawLabelWithFancyArrow(context, 'Крыша', 360, 110, 330, 140, activePart === 'roof');
      drawLabelWithFancyArrow(context, 'Двери', 250, 260, 210, 250, activePart === 'doors');
      drawLabelWithFancyArrow(context, 'Окна', 130, 180, 120, 195, activePart === 'windows');
      drawLabelWithFancyArrow(context, 'Пол', 350, 250, 330, 260, activePart === 'floor');
      drawLabelWithFancyArrow(context, 'Терраса', 310, 320, 300, 290, activePart === 'deck');
      drawLabelWithFancyArrow(context, 'Забор', 390, 310, 370, 300, activePart === 'fence');
    };

    function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - width/4, y - height/2, x - width/3, y + height, x, y + height);
      ctx.bezierCurveTo(x + width/3, y + height*1.2, x + width/2, y - height/2, x + width, y);
      ctx.bezierCurveTo(x + width*1.2, y - height, x + width*0.8, y - height, x, y);
      ctx.closePath();
      ctx.fill();
    }

    function drawLabelWithFancyArrow(
      ctx: CanvasRenderingContext2D, 
      text: string, 
      textX: number, 
      textY: number, 
      arrowX: number, 
      arrowY: number,
      isActive: boolean
    ) {
      // Draw text shadow for better visibility
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(text, textX + 1, textY + 1);
      
      // Draw text
      ctx.fillStyle = isActive ? '#6E59A5' : '#333';
      ctx.fillText(text, textX, textY);
      
      // Draw arrow
      ctx.beginPath();
      ctx.moveTo(textX + 5, textY - 5);
      
      // Curved arrow for better visual appeal
      const controlX = (textX + arrowX) / 2;
      const controlY = Math.min(textY, arrowY) - 10;
      
      ctx.quadraticCurveTo(controlX, controlY, arrowX, arrowY);
      
      // Arrow styling
      ctx.strokeStyle = isActive ? '#6E59A5' : '#555';
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();
      
      // Arrow head
      ctx.fillStyle = isActive ? '#6E59A5' : '#555';
      ctx.beginPath();
      ctx.arc(arrowX, arrowY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    drawHouse();
    
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (y > 280 && y < 300 && x > 50 && x < 350) {
        handlePartSelect('foundation');
      } else if (y > 150 && y < 280 && x > 70 && x < 330) {
        handlePartSelect('walls');
      } else if (y > 80 && y < 150 && x > 50 && x < 350 && 
                ((y > -0.35*x + 150) && (y < 0.35*x + 10))) {
        handlePartSelect('roof');
      } else if (y > 220 && y < 310 && x > 170 && x < 230) {
        handlePartSelect('doors');
      } else if (((y > 200 && y < 250 && x > 100 && x < 150) || 
                 (y > 200 && y < 250 && x > 250 && x < 300))) {
        handlePartSelect('windows');
      } else if (y > 260 && y < 270 && x > 70 && x < 330) {
        handlePartSelect('floor');
      } else if (y > 280 && y < 300 && x > 250 && x < 370) {
        handlePartSelect('deck');
      } else if (y > 290 && y < 320) {
        handlePartSelect('fence');
      }
    };
    
    canvas.addEventListener('click', handleCanvasClick);
    
    // Add animation frame for rotation if enabled
    let animationFrameId: number;
    
    if (isRotating) {
      const animate = () => {
        setRotation(prev => (prev + 0.2) % 360);
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
    } else {
      drawHouse();
    }
    
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activePart, isVisible, isRotating, rotation]);
  
  const handlePartSelect = (part: HousePart) => {
    setActivePart(part === activePart ? null : part);
    toast({
      title: `Выбрано: ${partsInfo[part].name}`,
      description: partsInfo[part].description,
    });
  };
  
  const goToCatalogWithFilter = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card className="w-full shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl">
      <CardHeader className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Home className="h-6 w-6" /> Интерактивная модель дома
            </CardTitle>
            <CardDescription className="text-green-100 mt-1">
              Нажмите на различные части дома, чтобы увидеть подходящие материалы
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsRotating(!isRotating)} 
              className={`border-green-300 ${isRotating ? 'bg-green-700/40' : 'bg-green-700/20'} text-white hover:bg-green-700/40 hover:text-white`}
            >
              <motion.div
                animate={{ rotate: isRotating ? 360 : 0 }}
                transition={{ duration: 2, repeat: isRotating ? Infinity : 0, ease: "linear" }}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
              </motion.div>
              {isRotating ? "Остановить" : "Вращение"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActivePart(null)}
              className="border-green-300 bg-green-700/20 text-white hover:bg-green-700/40 hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Сброс
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 bg-white p-4 min-h-[400px] flex items-center justify-center">
            <motion.div 
              className="relative w-full max-w-lg h-[400px]"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <canvas 
                ref={canvasRef} 
                className="w-full h-full cursor-pointer shadow-lg bg-gradient-to-b from-blue-50 to-white rounded-xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 flex items-center">
                  <Info className="h-3 w-3 mr-1" /> Нажмите на элементы дома для просмотра материалов
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-2 border-l border-gray-100 p-4 max-h-[400px] overflow-y-auto">
            {activePart ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                    {partsInfo[activePart].icon}
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
                    <motion.div 
                      key={index} 
                      className="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-24 h-24 flex-shrink-0 relative group overflow-hidden">
                        <img 
                          src={material.image} 
                          alt={material.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                          <span className="text-white text-xs font-medium">{material.price?.toLocaleString()} ₽/м³</span>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <h5 className="font-medium text-gray-800">{material.name}</h5>
                          <p className="text-xs text-gray-500">{material.category}</p>
                          {material.price && (
                            <p className="text-sm font-semibold text-green-700 mt-1">{material.price.toLocaleString()} ₽/м³</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-2 bg-green-600 hover:bg-green-700 w-full"
                          onClick={() => goToCatalogWithFilter(material.category)}
                        >
                          В каталог <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="h-full flex flex-col items-center justify-center text-center p-6"
                initial="hidden"
                animate="visible"
                variants={variants}
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Info className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Выберите часть дома</h3>
                <p className="text-gray-600 mb-6">
                  Нажмите на интересующую вас часть дома на модели слева, 
                  чтобы увидеть подходящие для неё материалы из нашего каталога.
                </p>
                <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                  {Object.entries(partsInfo).map(([key, part], index) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center p-2 h-auto"
                      onClick={() => handlePartSelect(key as HousePart)}
                    >
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-1">
                        {part.icon}
                      </div>
                      <span className="text-xs font-medium">{part.name}</span>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseVisualizer;
