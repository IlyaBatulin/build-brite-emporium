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
import { Cuboid, Home, Info, ArrowRight, Axe, CheckCircle2, Ruler, PanelTop, Warehouse, DoorOpen, LayoutGrid, Fence, Box, Star, Download, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    popularity?: number;
  }[];
}

const HouseVisualizer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePart, setActivePart] = useState<HousePart | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [view, setView] = useState<"3d" | "2d">("3d");
  const [timeOfDay, setTimeOfDay] = useState<"day" | "sunset" | "night">("day");
  const [viewMode, setViewMode] = useState<"materials" | "gallery" | "info">("materials");

  const partsInfo: Record<HousePart, PartInfo> = {
    foundation: {
      name: "Фундамент",
      description: "Основа любой постройки, определяет прочность и долговечность всей конструкции дома",
      icon: <Warehouse className="h-5 w-5 text-amber-600" />,
      materials: [
        {
          name: "Брус обрезной 150x150 мм",
          category: "Обрезной пиломатериал",
          image: "https://images.unsplash.com/photo-1504484656217-38f8ffc617f9?auto=format&fit=crop&q=80&w=300",
          price: 12500,
          popularity: 4.7
        },
        {
          name: "Доска обрезная 50x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300",
          price: 9800,
          popularity: 4.5
        },
        {
          name: "Брус клееный 200x200 мм",
          category: "Клееный брус",
          image: "https://images.unsplash.com/photo-1533713692156-f70938dc0d54?auto=format&fit=crop&q=80&w=300",
          price: 25800,
          popularity: 4.9
        }
      ]
    },
    walls: {
      name: "Стены",
      description: "Формируют внешний контур и внутреннее пространство дома, обеспечивая тепло- и звукоизоляцию",
      icon: <PanelTop className="h-5 w-5 text-emerald-600" />,
      materials: [
        {
          name: "Брус профилированный 190x140 мм",
          category: "Брус профилированный",
          image: "https://images.unsplash.com/photo-1584417031970-04f412fac596?auto=format&fit=crop&q=80&w=300",
          price: 18400,
          popularity: 4.8
        },
        {
          name: "Блок-хаус 20x140 мм",
          category: "Блок-хаус",
          image: "https://images.unsplash.com/photo-1606040379749-24da4a6b8924?auto=format&fit=crop&q=80&w=300",
          price: 8900,
          popularity: 4.4
        },
        {
          name: "Имитация бруса 20x190 мм",
          category: "Имитация бруса",
          image: "https://images.unsplash.com/photo-1567225591450-06036b3312f4?auto=format&fit=crop&q=80&w=300",
          price: 9500,
          popularity: 4.3
        }
      ]
    },
    roof: {
      name: "Крыша",
      description: "Верхняя часть конструкции, защищающая от осадков и придающая дому завершенный архитектурный вид",
      icon: <Home className="h-5 w-5 text-red-600" />,
      materials: [
        {
          name: "Доска обрезная 25x150 мм",
          category: "Доска обрезная",
          image: "https://images.unsplash.com/photo-1620705811053-7d6947c576ff?auto=format&fit=crop&q=80&w=300",
          price: 7600,
          popularity: 4.2
        },
        {
          name: "Брусок строганный 50x50 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1601289126034-82a05f13f053?auto=format&fit=crop&q=80&w=300",
          price: 3500,
          popularity: 4.1
        },
        {
          name: "Обрешетка 25x100 мм",
          category: "Обрешетка кровельная",
          image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=300",
          price: 4200,
          popularity: 4.4
        }
      ]
    },
    floor: {
      name: "Пол",
      description: "Горизонтальная поверхность для передвижения и размещения мебели, влияет на комфорт проживания",
      icon: <LayoutGrid className="h-5 w-5 text-blue-600" />,
      materials: [
        {
          name: "Доска половая 28x140 мм",
          category: "Шпунтованная доска",
          image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=300",
          price: 14200,
          popularity: 4.7
        },
        {
          name: "Фанера ФСФ 18 мм",
          category: "Фанера ФСФ",
          image: "https://images.unsplash.com/photo-1516333707343-720c180e3f6e?auto=format&fit=crop&q=80&w=300",
          price: 11500,
          popularity: 4.3
        },
        {
          name: "Массивная доска 20x120 мм",
          category: "Массивная доска",
          image: "https://images.unsplash.com/photo-1581112877490-ebde93267ed9?auto=format&fit=crop&q=80&w=300",
          price: 18900,
          popularity: 4.9
        }
      ]
    },
    windows: {
      name: "Окна",
      description: "Элементы остекления для естественного освещения и вентиляции помещений, влияют на энергоэффективность",
      icon: <Ruler className="h-5 w-5 text-violet-600" />,
      materials: [
        {
          name: "Брусок строганный 70x70 мм",
          category: "Сухой строганный брусок",
          image: "https://images.unsplash.com/photo-1606043633058-677cb97996cf?auto=format&fit=crop&q=80&w=300",
          price: 6700,
          popularity: 4.0
        },
        {
          name: "Наличник 16x80 мм",
          category: "Наличники и плинтуса",
          image: "https://images.unsplash.com/photo-1581525271642-2df3b6afb68d?auto=format&fit=crop&q=80&w=300",
          price: 3200,
          popularity: 4.2
        },
        {
          name: "Подоконник сосновый 40x300 мм",
          category: "Подоконники",
          image: "https://images.unsplash.com/photo-1592595293784-06ca79eaf8fb?auto=format&fit=crop&q=80&w=300",
          price: 8500,
          popularity: 4.6
        }
      ]
    },
    doors: {
      name: "Двери",
      description: "Вход и выход из помещения, разделение пространства, обеспечивают безопасность и приватность",
      icon: <DoorOpen className="h-5 w-5 text-cyan-600" />,
      materials: [
        {
          name: "Брус строганный 100x45 мм",
          category: "Сухой строганный брус",
          image: "https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&q=80&w=300",
          price: 8300,
          popularity: 4.3
        },
        {
          name: "Дверная коробка 100x70 мм",
          category: "Дверные коробки",
          image: "https://images.unsplash.com/photo-1620636530493-5faca50dad6a?auto=format&fit=crop&q=80&w=300",
          price: 12500,
          popularity: 4.5
        },
        {
          name: "Наличник фигурный 20x90 мм",
          category: "Наличники фигурные",
          image: "https://images.unsplash.com/photo-1584622716210-a94cc13c3e53?auto=format&fit=crop&q=80&w=300",
          price: 4800,
          popularity: 4.7
        }
      ]
    },
    deck: {
      name: "Терраса",
      description: "Открытая площадка, примыкающая к дому, создает комфортное пространство для отдыха на свежем воздухе",
      icon: <Cuboid className="h-5 w-5 text-orange-600" />,
      materials: [
        {
          name: "Террасная доска 28x140 мм",
          category: "Террасная доска",
          image: "https://images.unsplash.com/photo-1639143906824-5852428a1490?auto=format&fit=crop&q=80&w=300",
          price: 16800,
          popularity: 4.9
        },
        {
          name: "Лага 50x150 мм",
          category: "Лаги и балки",
          image: "https://images.unsplash.com/photo-1567225592782-eb2ebd8862b6?auto=format&fit=crop&q=80&w=300",
          price: 9600,
          popularity: 4.4
        },
        {
          name: "Ступени 40x300 мм",
          category: "Ступени и перила",
          image: "https://images.unsplash.com/photo-1583095117934-3670ab705c62?auto=format&fit=crop&q=80&w=300",
          price: 14500,
          popularity: 4.6
        }
      ]
    },
    fence: {
      name: "Забор",
      description: "Ограждение территории вокруг дома, обеспечивает приватность и безопасность придомовой территории",
      icon: <Fence className="h-5 w-5 text-lime-600" />,
      materials: [
        {
          name: "Планкен 20x140 мм",
          category: "Планкен",
          image: "https://images.unsplash.com/photo-1581515286943-8d1ca5f740c1?auto=format&fit=crop&q=80&w=300",
          price: 9200,
          popularity: 4.5
        },
        {
          name: "Штакетник 20x100 мм",
          category: "Штакетник",
          image: "https://images.unsplash.com/photo-1627323729751-6574e85c7206?auto=format&fit=crop&q=80&w=300",
          price: 7400,
          popularity: 4.3
        },
        {
          name: "Брус для опор 100x100 мм",
          category: "Брус строганный",
          image: "https://images.unsplash.com/photo-1573061750909-d2da089d416e?auto=format&fit=crop&q=80&w=300",
          price: 10200,
          popularity: 4.4
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
      
      // Set background based on time of day
      let skyGradient;
      if (timeOfDay === "day") {
        skyGradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#C6E6FB');
      } else if (timeOfDay === "sunset") {
        skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#FF7F50');
        skyGradient.addColorStop(0.3, '#FFDB58');
        skyGradient.addColorStop(1, '#87CEEB');
      } else { // night
        skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#000033');
        skyGradient.addColorStop(0.7, '#191970');
        skyGradient.addColorStop(1, '#4B0082');
      }
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      if (timeOfDay === "day" || timeOfDay === "sunset") {
        context.fillStyle = timeOfDay === "day" ? '#ffffff' : '#FFF5EE';
        drawCloud(context, 50, 60, 60, 30);
        drawCloud(context, 250, 40, 80, 25);
      }
      
      // Draw stars at night
      if (timeOfDay === "night") {
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height / 2);
          const radius = Math.random() * 1.5;
          context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
        
        // Draw moon
        const moonGradient = context.createRadialGradient(70, 70, 15, 70, 70, 30);
        moonGradient.addColorStop(0, 'rgba(255, 255, 240, 1)');
        moonGradient.addColorStop(0.5, 'rgba(255, 255, 220, 0.9)');
        moonGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
        context.fillStyle = moonGradient;
        context.beginPath();
        context.arc(70, 70, 30, 0, Math.PI * 2);
        context.fill();
      } else {
        // Draw sun
        const sunRadius = timeOfDay === "sunset" ? 40 : 30;
        const sunX = timeOfDay === "sunset" ? 350 : 70;
        const sunY = timeOfDay === "sunset" ? 100 : 60;
        const sunColor1 = timeOfDay === "sunset" ? 'rgba(255, 69, 0, 1)' : 'rgba(255, 255, 190, 1)';
        const sunColor2 = timeOfDay === "sunset" ? 'rgba(255, 140, 0, 0.7)' : 'rgba(255, 235, 150, 0.3)';
        
        const sunGradient = context.createRadialGradient(sunX, sunY, 5, sunX, sunY, sunRadius);
        sunGradient.addColorStop(0, sunColor1);
        sunGradient.addColorStop(1, sunColor2);
        context.fillStyle = sunGradient;
        context.beginPath();
        context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        context.fill();
        
        // Add sun rays if sunset
        if (timeOfDay === "sunset") {
          context.strokeStyle = 'rgba(255, 140, 0, 0.5)';
          context.lineWidth = 2;
          for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            context.beginPath();
            context.moveTo(
              sunX + Math.cos(angle) * (sunRadius + 5),
              sunY + Math.sin(angle) * (sunRadius + 5)
            );
            context.lineTo(
              sunX + Math.cos(angle) * (sunRadius + 25),
              sunY + Math.sin(angle) * (sunRadius + 25)
            );
            context.stroke();
          }
        }
      }
      
      // Draw ground
      const groundGradient = context.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
      if (timeOfDay === "night") {
        groundGradient.addColorStop(0, '#2E4538');
        groundGradient.addColorStop(1, '#1E3328');
      } else if (timeOfDay === "sunset") {
        groundGradient.addColorStop(0, '#81a574');
        groundGradient.addColorStop(1, '#5e7a53');
      } else {
        groundGradient.addColorStop(0, '#81c784');
        groundGradient.addColorStop(1, '#66bb6a');
      }
      context.fillStyle = groundGradient;
      context.fillRect(0, canvas.height - 100, canvas.width, 100);
      
      // Apply shadow for the whole house
      if (view === "3d") {
        context.save();
        context.shadowColor = 'rgba(0, 0, 0, 0.3)';
        context.shadowBlur = 15;
        context.shadowOffsetX = 10;
        context.shadowOffsetY = 10;
      }
      
      // Draw foundation shadow
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.beginPath();
      if (view === "3d") {
        context.ellipse(200, 300, 160, 40, 0, 0, Math.PI * 2);
      } else {
        context.rect(50, 290, 300, 10);
      }
      context.fill();
      
      // Draw foundation
      const foundationGradient = context.createLinearGradient(50, 280, 350, 300);
      if (timeOfDay === "night") {
        foundationGradient.addColorStop(0, activePart === 'foundation' ? '#7b68e0' : '#777');
        foundationGradient.addColorStop(1, activePart === 'foundation' ? '#8c7be0' : '#555');
      } else {
        foundationGradient.addColorStop(0, activePart === 'foundation' ? '#9b87f5' : '#bbb');
        foundationGradient.addColorStop(1, activePart === 'foundation' ? '#ac9bf9' : '#999');
      }
      context.fillStyle = foundationGradient;
      
      if (view === "3d") {
        // 3D Foundation
        context.beginPath();
        context.moveTo(50, 280);
        context.lineTo(350, 280);
        context.lineTo(350, 300);
        context.lineTo(50, 300);
        context.closePath();
        context.fill();
        
        // Add foundation texture
        if (activePart !== 'foundation') {
          context.strokeStyle = timeOfDay === "night" ? '#444' : '#888';
          context.lineWidth = 1;
          for (let i = 55; i < 350; i += 30) {
            context.beginPath();
            context.moveTo(i, 280);
            context.lineTo(i, 300);
            context.stroke();
          }
        }
      } else {
        // 2D Foundation
        context.fillRect(50, 280, 300, 20);
      }
      
      // Draw walls with gradient and texture
      const wallsGradient = context.createLinearGradient(70, 150, 330, 280);
      if (timeOfDay === "night") {
        wallsGradient.addColorStop(0, activePart === 'walls' ? '#7b68e0' : '#c5bdea');
        wallsGradient.addColorStop(1, activePart === 'walls' ? '#8c7be0' : '#b6ade9');
      } else {
        wallsGradient.addColorStop(0, activePart === 'walls' ? '#9b87f5' : '#e5deff');
        wallsGradient.addColorStop(1, activePart === 'walls' ? '#ac9bf9' : '#d6ccff');
      }
      
      context.fillStyle = wallsGradient;
      
      if (view === "3d") {
        // 3D Walls
        context.beginPath();
        context.moveTo(70, 150);
        context.lineTo(330, 150);
        context.lineTo(330, 280);
        context.lineTo(70, 280);
        context.closePath();
        context.fill();
        
        // Wall edges
        context.strokeStyle = timeOfDay === "night" ? '#a699e8' : '#c5b9fc';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(70, 150);
        context.lineTo(70, 280);
        context.moveTo(330, 150);
        context.lineTo(330, 280);
        context.stroke();
      } else {
        // 2D Walls
        context.fillRect(70, 150, 260, 130);
      }
      
      // Add wall texture
      if (activePart !== 'walls') {
        context.strokeStyle = timeOfDay === "night" ? '#b6ade9' : '#d6ccff';
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
      if (timeOfDay === "night") {
        roofGradient.addColorStop(0, activePart === 'roof' ? '#7b68e0' : '#b6a6ea');
        roofGradient.addColorStop(1, activePart === 'roof' ? '#8c7be0' : '#a993e9');
      } else {
        roofGradient.addColorStop(0, activePart === 'roof' ? '#9b87f5' : '#D6BCFA');
        roofGradient.addColorStop(1, activePart === 'roof' ? '#ac9bf9' : '#c9a9f9');
      }
      
      context.fillStyle = roofGradient;
      context.beginPath();
      context.moveTo(50, 150);
      context.lineTo(200, 80);
      context.lineTo(350, 150);
      context.closePath();
      context.fill();
      
      if (view === "3d") {
        // 3D effect for roof - side edge
        const roofSideGradient = context.createLinearGradient(50, 150, 350, 150);
        roofSideGradient.addColorStop(0, timeOfDay === "night" ? '#9984e9' : '#b996fc');
        roofSideGradient.addColorStop(1, timeOfDay === "night" ? '#7b68e0' : '#9b87f5');
        context.fillStyle = roofSideGradient;
        context.beginPath();
        context.moveTo(350, 150);
        context.lineTo(370, 160);
        context.lineTo(200, 90);
        context.lineTo(200, 80);
        context.closePath();
        context.fill();
      }
      
      // Add roof texture
      if (activePart !== 'roof') {
        context.strokeStyle = timeOfDay === "night" ? '#a993e9' : '#c9a9f9';
        context.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          context.beginPath();
          context.moveTo(50 + i*50, 150);
          context.lineTo(200, 80);
          context.stroke();
        }
      }
      
      // Draw chimney
      context.fillStyle = activePart === 'roof' ? 
        (timeOfDay === "night" ? '#7b68e0' : '#9b87f5') : 
        (timeOfDay === "night" ? '#8870b0' : '#A98AC0');
      
      if (view === "3d") {
        // 3D Chimney
        context.beginPath();
        context.moveTo(280, 95);
        context.lineTo(300, 95);
        context.lineTo(300, 135);
        context.lineTo(280, 135);
        context.closePath();
        context.fill();
        
        // Chimney side
        const chimneySideColor = timeOfDay === "night" ? '#7865ad' : '#9879b8';
        context.fillStyle = chimneySideColor;
        context.beginPath();
        context.moveTo(300, 95);
        context.lineTo(310, 100);
        context.lineTo(310, 140);
        context.lineTo(300, 135);
        context.closePath();
        context.fill();
        
        // Chimney top
        const chimneyTopColor = timeOfDay === "night" ? '#6a5c9b' : '#8a6ca8';
        context.fillStyle = chimneyTopColor;
        context.beginPath();
        context.moveTo(280, 95);
        context.lineTo(300, 95);
        context.lineTo(310, 100);
        context.lineTo(290, 100);
        context.closePath();
        context.fill();
        
        // Draw smoke if needed
        if (timeOfDay !== "day" || Math.random() > 0.4) {
          drawSmoke(context, 295, 90);
        }
      } else {
        // 2D Chimney
        context.fillRect(280, 95, 20, 40);
      }
      
      // Draw door with gradient
      const doorGradient = context.createLinearGradient(170, 220, 230, 220);
      if (timeOfDay === "night") {
        doorGradient.addColorStop(0, activePart === 'doors' ? '#7b68e0' : '#5a4985');
        doorGradient.addColorStop(1, activePart === 'doors' ? '#8c7be0' : '#654c95');
      } else {
        doorGradient.addColorStop(0, activePart === 'doors' ? '#9b87f5' : '#6E59A5');
        doorGradient.addColorStop(1, activePart === 'doors' ? '#ac9bf9' : '#795EB5');
      }
      
      context.fillStyle = doorGradient;
      
      if (view === "3d") {
        // 3D Door
        context.beginPath();
        context.moveTo(170, 220);
        context.lineTo(230, 220);
        context.lineTo(230, 300);
        context.lineTo(170, 300);
        context.closePath();
        context.fill();
        
        // Door frame
        context.strokeStyle = timeOfDay === "night" ? '#786cb8' : '#8e7ccf';
        context.lineWidth = 2;
        context.strokeRect(170, 220, 60, 80);
        
        // Door panels
        context.strokeStyle = timeOfDay === "night" ? '#685ba3' : '#7464b9';
        context.lineWidth = 1;
        context.strokeRect(180, 230, 40, 30);
        context.strokeRect(180, 270, 40, 20);
      } else {
        // 2D Door
        context.fillRect(170, 220, 60, 80);
      }
      
      // Door handle
      context.fillStyle = timeOfDay === "night" ? '#d4af37' : '#FFD700';
      context.beginPath();
      context.arc(220, 265, 3, 0, Math.PI * 2);
      context.fill();
      
      // Draw windows with gradient
      const windowGradient = context.createLinearGradient(100, 200, 150, 250);
      if (timeOfDay === "night") {
        // Night windows glow
        windowGradient.addColorStop(0, activePart === 'windows' ? '#7b68e0' : '#ffdb58');
        windowGradient.addColorStop(1, activePart === 'windows' ? '#8c7be0' : '#e6c35c');
      } else {
        windowGradient.addColorStop(0, activePart === 'windows' ? '#9b87f5' : '#7E69AB');
        windowGradient.addColorStop(1, activePart === 'windows' ? '#ac9bf9' : '#9178C5');
      }
      
      context.fillStyle = windowGradient;
      
      if (view === "3d") {
        // 3D Windows with frames
        // Left window
        context.fillRect(100, 200, 50, 50);
        // Window frame
        context.strokeStyle = timeOfDay === "night" ? '#7865a5' : '#9284C5';
        context.lineWidth = 2;
        context.strokeRect(100, 200, 50, 50);
        
        // Right window
        context.fillRect(250, 200, 50, 50);
        context.strokeRect(250, 200, 50, 50);
      } else {
        // 2D Windows
        context.fillRect(100, 200, 50, 50);
        context.fillRect(250, 200, 50, 50);
      }
      
      // Window frames
      if (activePart !== 'windows') {
        context.strokeStyle = timeOfDay === "night" ? '#7865a5' : '#9284C5';
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
      context.fillStyle = activePart === 'floor' ? 
        (timeOfDay === "night" ? '#7b68e0' : '#9b87f5') : 
        (timeOfDay === "night" ? '#737578' : '#8E9196');
      
      if (view === "3d") {
        context.fillRect(70, 269, 260, 11);
        // Floor texture
        if (activePart !== 'floor') {
          context.strokeStyle = timeOfDay === "night" ? '#626266' : '#7A7C82';
          context.lineWidth = 1;
          for (let i = 85; i < 330; i += 20) {
            context.beginPath();
            context.moveTo(i, 269);
            context.lineTo(i, 280);
            context.stroke();
          }
        }
      } else {
        context.fillRect(70, 260, 260, 10);
      }
      
      // Draw deck with gradient
      const deckGradient = context.createLinearGradient(250, 280, 370, 300);
      if (timeOfDay === "night") {
        deckGradient.addColorStop(0, activePart === 'deck' ? '#7b68e0' : '#D2EBBF');
        deckGradient.addColorStop(1, activePart === 'deck' ? '#8c7be0' : '#C5E0B2');
      } else {
        deckGradient.addColorStop(0, activePart === 'deck' ? '#9b87f5' : '#F2FCE2');
        deckGradient.addColorStop(1, activePart === 'deck' ? '#ac9bf9' : '#E5F9D5');
      }
      
      context.fillStyle = deckGradient;
      
      if (view === "3d") {
        // 3D Deck
        context.beginPath();
        context.moveTo(250, 280);
        context.lineTo(370, 280);
        context.lineTo(370, 300);
        context.lineTo(250, 300);
        context.closePath();
        context.fill();
        
        // Deck support posts
        const deckPostColor = timeOfDay === "night" ? '#B5CFA2' : '#D5E8C6';
        context.fillStyle = deckPostColor;
        context.fillRect(260, 300, 5, 20);
        context.fillRect(360, 300, 5, 20);
        
        // Deck railing
        if (activePart === 'deck') {
          const railingColor = timeOfDay === "night" ? '#7b68e0' : '#9b87f5';
          context.fillStyle = railingColor;
        } else {
          const railingColor = timeOfDay === "night" ? '#C5E0B2' : '#E0F4CB';
          context.fillStyle = railingColor;
        }
        context.fillRect(250, 270, 120, 5);
        for (let i = 260; i < 360; i += 20) {
          context.fillRect(i, 270, 3, 10);
        }
      } else {
        // 2D Deck
        context.fillRect(250, 280, 120, 20);
      }
      
      // Deck texture
      if (activePart !== 'deck') {
        context.strokeStyle = timeOfDay === "night" ? '#B5CFA2' : '#D5E8C6';
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
      if (timeOfDay === "night") {
        fenceGradient.addColorStop(0, activePart === 'fence' ? '#7b68e0' : '#DECB8B');
        fenceGradient.addColorStop(1, activePart === 'fence' ? '#8c7be0' : '#D0BE80');
      } else {
        fenceGradient.addColorStop(0, activePart === 'fence' ? '#9b87f5' : '#FEF7CD');
        fenceGradient.addColorStop(1, activePart === 'fence' ? '#ac9bf9' : '#FCF0B0');
      }
      
      context.fillStyle = fenceGradient;
      
      if (view === "3d") {
        // 3D Fence
        const fenceHeight = 30;
        const picketWidth = 5;
        const picketGap = 15;
        const upperRail = 295;
        const lowerRail = 310;
        
        // Horizontal rails
        context.fillRect(20, upperRail, 360, 3);
        context.fillRect(20, lowerRail, 360, 3);
        
        // Pickets
        for (let i = 20; i <= 380; i += picketWidth + picketGap) {
          if ((i < 140 || i > 240) && i + picketWidth <= 380) {
            context.fillRect(i, 290, picketWidth, fenceHeight);
            
            // Picket tops
            context.beginPath();
            context.moveTo(i, 290);
            context.lineTo(i + picketWidth/2, 285);
            context.lineTo(i + picketWidth, 290);
            context.closePath();
            context.fill();
          }
        }
      } else {
        // 2D Fence
        for (let i = 20; i <= 380; i += 20) {
          if (i < 140 || i > 240) 
            context.fillRect(i, 290, 5, 30);
        }
      }
      
      if (view === "3d") {
        context.restore(); // Restore from shadow
      }
      
      // Draw landscape elements
      if (view === "3d") {
        // Trees
        drawTree(context, 40, 280, timeOfDay);
        drawTree(context, 380, 260, timeOfDay);
        
        // Bushes
        drawBush(context, 20, 330, timeOfDay);
        drawBush(context, 350, 320, timeOfDay);
        drawBush(context, 170, 320, timeOfDay);
      }
      
      // Draw labels with improved styling
      context.font = 'bold 12px Arial';
      
      // Draw arrows and labels with glow effect for better visibility
      drawLabelWithFancyArrow(context, 'Фундамент', 40, 320, 100, 290, activePart === 'foundation', timeOfDay);
      drawLabelWithFancyArrow(context, 'Стены', 30, 190, 70, 200, activePart === 'walls', timeOfDay);
      drawLabelWithFancyArrow(context, 'Крыша', 360, 110, 330, 140, activePart === 'roof', timeOfDay);
      drawLabelWithFancyArrow(context, 'Двери', 250, 260, 210, 250, activePart === 'doors', timeOfDay);
      drawLabelWithFancyArrow(context, 'Окна', 130, 180, 120, 195, activePart === 'windows', timeOfDay);
      drawLabelWithFancyArrow(context, 'Пол', 350, 250, 330, 260, activePart === 'floor', timeOfDay);
      drawLabelWithFancyArrow(context, 'Терраса', 310, 320, 300, 290, activePart === 'deck', timeOfDay);
      drawLabelWithFancyArrow(context, 'Забор', 390, 310, 370, 300, activePart === 'fence', timeOfDay);
    };

    function drawSmoke(ctx: CanvasRenderingContext2D, x: number, y: number) {
      ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
      
      // Draw several smoke particles
      for (let i = 0; i < 5; i++) {
        const offsetX = Math.sin(Date.now() / 1000 + i) * 5;
        const offsetY = -10 * i;
        const size = 8 - i * 1.2;
        const opacity = 0.6 - i * 0.1;
        
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 200, ${opacity})`;
        ctx.fill();
      }
    }

    function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, time: string) {
      // Tree trunk
      const trunkColor = time === "night" ? '#5D4037' : '#8B5A2B';
      ctx.fillStyle = trunkColor;
      ctx.fillRect(x - 5, y - 50, 10, 50);
      
      // Tree crown
      const crownColor = time === "night" ? '#2D5F2D' : '#4CAF50';
      ctx.fillStyle = crownColor;
      
      ctx.beginPath();
      ctx.moveTo(x, y - 100);
      ctx.lineTo(x + 25, y - 50);
      ctx.lineTo(x - 25, y - 50);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(x, y - 85);
      ctx.lineTo(x + 20, y - 40);
      ctx.lineTo(x - 20, y - 40);
      ctx.closePath();
      ctx.fill();
    }
    
    function drawBush(ctx: CanvasRenderingContext2D, x: number, y: number, time: string) {
      const bushColor = time === "night" ? '#1B5E20' : '#4CAF50';
      ctx.fillStyle = bushColor;
      
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.arc(x + 10, y - 5, 12, 0, Math.PI * 2);
      ctx.arc(x - 10, y - 3, 13, 0, Math.PI * 2);
      ctx.fill();
    }

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
      isActive: boolean,
      time: string
    ) {
      // Determine colors based on time of day and active state
      const shadowColor = time === "night" ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
      const textColor = isActive 
        ? (time === "night" ? '#9b87f5' : '#6E59A5') 
        : (time === "night" ? '#e0e0e0' : '#333');
      const arrowColor = isActive 
        ? (time === "night" ? '#9b87f5' : '#6E59A5') 
        : (time === "night" ? '#d0d0d0' : '#555');
      
      // Draw text shadow for better visibility
      ctx.fillStyle = shadowColor;
      ctx.fillText(text, textX + 1, textY + 1);
      
      // Draw text
      ctx.fillStyle = textColor;
      ctx.fillText(text, textX, textY);
      
      // Draw arrow
      ctx.beginPath();
      ctx.moveTo(textX + 5, textY - 5);
      
      // Curved arrow for better visual appeal
      const controlX = (textX + arrowX) / 2;
      const controlY = Math.min(textY, arrowY) - 10;
      
      ctx.quadraticCurveTo(controlX, controlY, arrowX, arrowY);
      
      // Arrow styling
      ctx.strokeStyle = arrowColor;
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();
      
      // Arrow head
      ctx.fillStyle = arrowColor;
      ctx.beginPath();
      ctx.arc(arrowX, arrowY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    drawHouse();
    
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Adjust hitbox areas based on view mode
      const hitAreas: Record<HousePart, (x: number, y: number) => boolean> = {
        foundation: (x, y) => y > 280 && y < 300 && x > 50 && x < 350,
        walls: (x, y) => y > 150 && y < 280 && x > 70 && x < 330,
        roof: (x, y) => y > 80 && y < 150 && x > 50 && x < 350 && 
                        ((y > -0.35*x + 150) && (y < 0.35*x + 10)),
        doors: (x, y) => y > 220 && y < 310 && x > 170 && x < 230,
        windows: (x, y) => ((y > 200 && y < 250 && x > 100 && x < 150) || 
                          (y > 200 && y < 250 && x > 250 && x < 300)),
        floor: (x, y) => y > 260 && y < 270 && x > 70 && x < 330,
        deck: (x, y) => y > 280 && y < 300 && x > 250 && x < 370,
        fence: (x, y) => y > 290 && y < 320 && ((x > 20 && x < 140) || (x > 240 && x < 380))
      };
      
      let clickedPart: HousePart | null = null;
      
      // Check which part was clicked
      for (const [part, hitTest] of Object.entries(hitAreas)) {
        if (hitTest(x, y)) {
          clickedPart = part as HousePart;
          break;
        }
      }
      
      if (clickedPart) {
        handlePartSelect(clickedPart);
      }
    };
    
    canvas.addEventListener('click', handleCanvasClick);
    
    drawHouse();
    
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activePart, isVisible, view, timeOfDay]);
  
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

  const materialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <Card className="w-full shadow-xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl">
      <CardHeader className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Home className="h-6 w-6" /> Интерактивная модель дома
            </CardTitle>
            <CardDescription className="text-green-100 mt-1">
              Исследуйте различные части дома, чтобы узнать о подходящих материалах и решениях
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs value={timeOfDay} onValueChange={(v) => setTimeOfDay(v as any)} className="w-auto">
              <TabsList className="bg-green-700/40 border border-green-500/30">
                <TabsTrigger 
                  value="day" 
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-100 data-[state=inactive]:hover:bg-green-700/40"
                >
                  День
                </TabsTrigger>
                <TabsTrigger 
                  value="sunset" 
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-100 data-[state=inactive]:hover:bg-green-700/40"
                >
                  Закат
                </TabsTrigger>
                <TabsTrigger 
                  value="night" 
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-100 data-[state=inactive]:hover:bg-green-700/40"
                >
                  Ночь
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setView(view === "3d" ? "2d" : "3d")} 
              className={`border-green-300 ${view === "3d" ? 'bg-green-700/40' : 'bg-green-700/20'} text-white hover:bg-green-700/40 hover:text-white`}
            >
              <motion.div
                animate={{ rotate: view === "3d" ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Box className="h-4 w-4 mr-1" />
              </motion.div>
              {view === "3d" ? "3D" : "2D"} вид
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 bg-white p-4 min-h-[500px] flex items-center justify-center">
            <motion.div 
              className="relative w-full max-w-lg h-[500px]"
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
              
              <motion.div 
                className="absolute top-4 right-4 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {Object.entries(partsInfo).map(([key, part], index) => (
                  <motion.div
                    key={key}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={activePart === key ? "default" : "outline"}
                      size="sm"
                      className={`w-8 h-8 p-0 rounded-full ${
                        activePart === key 
                          ? 'bg-green-700 hover:bg-green-800' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handlePartSelect(key as HousePart)}
                      title={part.name}
                    >
                      {part.icon}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="md:col-span-2 border-l border-gray-100 p-4 max-h-[500px] overflow-y-auto">
            {activePart ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {partsInfo[activePart].icon}
                      <h3 className="font-bold text-lg text-green-800">{partsInfo[activePart].name}</h3>
                    </div>
                    <TabsList>
                      <TabsTrigger value="materials" className="text-xs">
                        Материалы
                      </TabsTrigger>
                      <TabsTrigger value="gallery" className="text-xs">
                        Галерея
                      </TabsTrigger>
                      <TabsTrigger value="info" className="text-xs">
                        Информация
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="materials" className="m-0">
                    <div className="space-y-4">
                      <p className="text-gray-600 mb-4">
                        {partsInfo[activePart].description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Axe className="h-4 w-4 text-green-600" />
                        <h4 className="font-medium text-gray-800">
                          Подходящие материалы:
                        </h4>
                      </div>
                      
                      <div className="grid gap-3">
                        {partsInfo[activePart].materials.map((material, index) => (
                          <motion.div 
                            key={index} 
                            className="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            custom={index}
                            variants={materialVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <div className="w-24 h-24 flex-shrink-0 relative group overflow-hidden">
                              <img 
                                src={material.image} 
                                alt={material.name} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                                <span className="text-white text-xs font-medium">{material.price?.toLocaleString()} ₽/м³</span>
                              </div>
                            </div>
                            <div className="p-3 flex flex-col justify-between flex-1">
                              <div>
                                <h5 className="font-medium text-gray-800 flex items-center">
                                  {material.name}
                                  {material.popularity && material.popularity >= 4.5 && (
                                    <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {material.popularity}
                                    </Badge>
                                  )}
                                </h5>
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
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery" className="m-0">
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div 
                          key={i} 
                          className="aspect-square rounded-lg overflow-hidden shadow-sm cursor-pointer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img 
                            src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?auto=format&fit=crop&q=80&w=300`}
                            alt={`Пример ${partsInfo[activePart].name.toLowerCase()}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <h4 className="font-medium text-gray-800 mt-4 mb-2">
                      Примеры использования
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Посмотрите, как используются материалы для {partsInfo[activePart].name.toLowerCase()} в реальных проектах.
                      Наши специалисты помогут подобрать оптимальные варианты для вашего дома.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Скачать каталог
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="info" className="m-0">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-l-2 border-green-500 pl-3">
                        <div className="mt-1 bg-green-100 p-1.5 rounded-full">
                          <Info className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            О {partsInfo[activePart].name.toLowerCase()}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {partsInfo[activePart].description} 
                            Правильный выбор материалов для {partsInfo[activePart].name.toLowerCase()} влияет на долговечность, внешний вид и энергоэффективность всей постройки.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 border-l-2 border-amber-500 pl-3">
                        <div className="mt-1 bg-amber-100 p-1.5 rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Рекомендации по выбору
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            При выборе материалов для {partsInfo[activePart].name.toLowerCase()} обратите внимание на: качество древесины, влажность, тип обработки, размеры и класс прочности.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 border-l-2 border-blue-500 pl-3">
                        <div className="mt-1 bg-blue-100 p-1.5 rounded-full">
                          <Globe className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Экологичность
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Наши материалы для {partsInfo[activePart].name.toLowerCase()} производятся с учетом экологических стандартов и имеют необходимые сертификаты качества и безопасности.
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-green-700" 
                        onClick={() => goToCatalogWithFilter(partsInfo[activePart].materials[0].category)}
                      >
                        Перейти к материалам <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div 
                className="h-full flex flex-col items-center justify-center text-center p-6"
                initial="hidden"
                animate="visible"
                variants={variants}
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Исследуйте интерактивную модель дома</h3>
                <p className="text-gray-600 mb-6">
                  Нажмите на интересующую вас часть дома на модели слева или выберите элемент на панели инструментов вверху, 
                  чтобы узнать больше о подходящих материалах из нашего каталога.
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
                
                <div className="w-full max-w-md bg-green-50 p-4 rounded-lg mt-6">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 fill-green-600 text-green-600" /> Советы по выбору материалов
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                      <span>Учитывайте климатические особенности вашего региона</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                      <span>Выбирайте материалы с оптимальным соотношением цены и качества</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                      <span>Проконсультируйтесь с нашими специалистами для получения индивидуальных рекомендаций</span>
                    </li>
                  </ul>
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
