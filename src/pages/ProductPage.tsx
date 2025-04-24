
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "@/data/mockData";
import { Product } from "@/types";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck, 
  Ruler, 
  Droplet, 
  Award, 
  Trees, 
  CheckCircle,
  Share2,
  Heart,
  Download,
  Calculator,
  MoveHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/products/ProductCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  
  const existingItem = items.find(item => item.product.id === id);
  
  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        
        // Get related products based on category or woodtype
        const related = getRelatedProducts(fetchedProduct.id, fetchedProduct.category);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Товар добавлен в корзину",
        description: `${product.name} (${quantity} ${product.unit})`,
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Пиломатериалы",
        text: product?.description || "Посмотрите этот товар!",
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Копирование ссылки",
          description: "Ссылка на товар скопирована в буфер обмена",
        });
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Копирование ссылки",
        description: "Ссылка на товар скопирована в буфер обмена",
      });
    }
  };
  
  const handleFavorite = () => {
    toast({
      title: "Добавлено в избранное",
      description: "Товар добавлен в список избранного",
    });
  };
  
  const calculateVolume = () => {
    if (!product || !product.thickness || !product.width || !product.length) return "N/A";
    
    const volumeInCubicMeters = (product.thickness * product.width * product.length) / 1000000000;
    return volumeInCubicMeters.toFixed(4);
  };
  
  const calculateTotalPrice = () => {
    if (!product) return 0;
    return product.price * quantity;
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Button asChild variant="outline">
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Link to="/catalog" className="flex items-center text-green-700 hover:text-green-800 mb-6 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Назад в каталог
        </Link>
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
              <div className="relative group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white shadow-md"
                          onClick={handleShare}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Поделиться</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white shadow-md"
                          onClick={handleFavorite}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>В избранное</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white shadow-md"
                          onClick={() => {
                            toast({
                              title: "Технический лист",
                              description: "Документация загружается...",
                            });
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Скачать спецификацию</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="p-8">
              <div className="mb-3 flex items-center">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-medium">
                  {product.category}
                </Badge>
                <span className="mx-2 text-gray-400">•</span>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    В наличии
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 font-medium">
                    Под заказ
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-green-700 flex items-center">
                  {product.price.toLocaleString()} ₽
                  <span className="text-sm text-gray-500 ml-1 font-normal">/{product.unit}</span>
                </p>
                {product.thickness && product.width && product.length && (
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calculator className="h-3 w-3 mr-1" />
                    Объём: {calculateVolume()} м³
                  </p>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-none rounded-l-md hover:bg-gray-50" 
                    onClick={handleDecrement}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-4 py-2 text-center min-w-[3rem] font-medium">{quantity}</div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-none rounded-r-md hover:bg-gray-50" 
                    onClick={handleIncrement}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="bg-green-700 hover:bg-green-800 flex-1 h-12 text-base"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {existingItem ? "Добавить еще" : "В корзину"}
                </Button>
              </div>
              
              <div className="text-right text-lg font-semibold text-gray-800">
                Итого: {calculateTotalPrice().toLocaleString()} ₽
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg mt-6 border border-green-200">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">Информация о доставке</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Доставка осуществляется по всему региону в течение 1-3 рабочих дней. 
                  Стоимость доставки зависит от объема заказа и расстояния.
                  Для уточнения деталей свяжитесь с нашим менеджером.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100">
            <Tabs defaultValue="specs" className="px-8 py-6">
              <TabsList className="mb-4">
                <TabsTrigger value="specs" className="px-6">
                  Характеристики
                </TabsTrigger>
                <TabsTrigger value="uses" className="px-6">
                  Применение
                </TabsTrigger>
                <TabsTrigger value="care" className="px-6">
                  Уход и хранение
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs">
                <Table>
                  <TableBody>
                    {product.woodType && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <Trees className="h-4 w-4 mr-2 text-green-600" />
                          Порода древесины
                        </TableCell>
                        <TableCell className="py-2">{product.woodType}</TableCell>
                      </TableRow>
                    )}
                    
                    {product.thickness && product.width && product.length && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <MoveHorizontal className="h-4 w-4 mr-2 text-green-600" />
                          Размеры
                        </TableCell>
                        <TableCell className="py-2">{product.thickness} × {product.width} × {product.length} мм</TableCell>
                      </TableRow>
                    )}
                    
                    {product.grade && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-green-600" />
                          Сортность
                        </TableCell>
                        <TableCell className="py-2">{product.grade}</TableCell>
                      </TableRow>
                    )}
                    
                    {product.moisture && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <Droplet className="h-4 w-4 mr-2 text-green-600" />
                          Влажность
                        </TableCell>
                        <TableCell className="py-2">{product.moisture}</TableCell>
                      </TableRow>
                    )}
                    
                    {product.surfaceTreatment && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <Ruler className="h-4 w-4 mr-2 text-green-600" />
                          Обработка поверхности
                        </TableCell>
                        <TableCell className="py-2">{product.surfaceTreatment}</TableCell>
                      </TableRow>
                    )}
                    
                    {product.purpose && (
                      <TableRow>
                        <TableCell className="font-medium py-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Назначение
                        </TableCell>
                        <TableCell className="py-2">{product.purpose}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="uses">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Рекомендуемое применение</h3>
                  
                  <div className="text-gray-700 space-y-2">
                    <p>Данный пиломатериал можно использовать для следующих целей:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.purpose === "Строительство" && (
                        <>
                          <li>Строительство каркасных домов и сооружений</li>
                          <li>Создание несущих конструкций</li>
                          <li>Устройство перекрытий, балок и стропил</li>
                          <li>Возведение перегородок</li>
                        </>
                      )}
                      
                      {product.purpose === "Отделка" && (
                        <>
                          <li>Отделка внутренних стен и потолков</li>
                          <li>Монтаж декоративных элементов</li>
                          <li>Облицовка фасадов</li>
                          <li>Создание интерьерных решений</li>
                        </>
                      )}
                      
                      {product.purpose === "Мебельное производство" && (
                        <>
                          <li>Изготовление корпусной мебели</li>
                          <li>Производство столов и стульев</li>
                          <li>Создание декоративных элементов мебели</li>
                          <li>Изготовление полок и шкафов</li>
                        </>
                      )}
                      
                      {product.purpose === "Декор" && (
                        <>
                          <li>Создание декоративных элементов интерьера</li>
                          <li>Изготовление предметов декора</li>
                          <li>Оформление витрин</li>
                          <li>Художественные работы</li>
                        </>
                      )}
                      
                      {!product.purpose && (
                        <>
                          <li>Универсальное применение в строительстве</li>
                          <li>Ремонтные и реставрационные работы</li>
                          <li>Создание различных конструкций</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="care">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Рекомендации по хранению и уходу</h3>
                  
                  <div className="text-gray-700 space-y-3">
                    <p>Для сохранения качества и эксплуатационных характеристик пиломатериала рекомендуется:</p>
                    
                    <h4 className="font-medium">Хранение:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Хранить в сухом, проветриваемом помещении</li>
                      <li>Избегать прямого контакта с землей и водой</li>
                      <li>Укладывать на ровную поверхность, предотвращая деформацию</li>
                      <li>Укрывать от прямых солнечных лучей и осадков</li>
                    </ul>
                    
                    <h4 className="font-medium">Уход:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Периодически обрабатывать защитными составами от влаги, гниения и насекомых</li>
                      <li>Обеспечивать своевременную просушку после контакта с влагой</li>
                      <li>При необходимости шлифовать поверхность для удаления неровностей</li>
                    </ul>
                    
                    <p className="italic">
                      При соблюдении рекомендаций по хранению и уходу, срок службы пиломатериала значительно увеличивается.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
