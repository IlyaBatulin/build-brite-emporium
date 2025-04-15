
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/mockData";
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
  CheckCircle 
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

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  
  const existingItem = items.find(item => item.product.id === id);
  
  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
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
    }
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
        <Link to="/catalog" className="flex items-center text-brand hover:text-brand-dark mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Назад в каталог
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-3">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-medium">
                {product.category}
              </Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
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
            
            <p className="text-3xl font-bold mb-6">{product.price.toLocaleString()} ₽/{product.unit}</p>
            
            {/* Product Specifications */}
            <div className="mb-6 space-y-4">
              <h2 className="text-lg font-semibold">Характеристики</h2>
              
              <Table>
                <TableBody>
                  {product.woodType && (
                    <TableRow>
                      <TableCell className="font-medium py-2 flex items-center">
                        <Trees className="h-4 w-4 mr-2 text-brand" />
                        Порода древесины
                      </TableCell>
                      <TableCell className="py-2">{product.woodType}</TableCell>
                    </TableRow>
                  )}
                  
                  {product.thickness && product.width && product.length && (
                    <TableRow>
                      <TableCell className="font-medium py-2 flex items-center">
                        <Ruler className="h-4 w-4 mr-2 text-brand" />
                        Размеры
                      </TableCell>
                      <TableCell className="py-2">{product.thickness} × {product.width} × {product.length} мм</TableCell>
                    </TableRow>
                  )}
                  
                  {product.grade && (
                    <TableRow>
                      <TableCell className="font-medium py-2 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-brand" />
                        Сортность
                      </TableCell>
                      <TableCell className="py-2">{product.grade}</TableCell>
                    </TableRow>
                  )}
                  
                  {product.moisture && (
                    <TableRow>
                      <TableCell className="font-medium py-2 flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-brand" />
                        Влажность
                      </TableCell>
                      <TableCell className="py-2">{product.moisture}</TableCell>
                    </TableRow>
                  )}
                  
                  {product.surfaceTreatment && (
                    <TableRow>
                      <TableCell className="font-medium py-2">Обработка поверхности</TableCell>
                      <TableCell className="py-2">{product.surfaceTreatment}</TableCell>
                    </TableRow>
                  )}
                  
                  {product.purpose && (
                    <TableRow>
                      <TableCell className="font-medium py-2">Назначение</TableCell>
                      <TableCell className="py-2">{product.purpose}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Описание</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none rounded-l-md" 
                  onClick={handleDecrement}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-4 py-2 text-center min-w-[3rem]">{quantity}</div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none rounded-r-md" 
                  onClick={handleIncrement}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="bg-brand hover:bg-brand-dark flex-1"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {existingItem ? "Добавить еще" : "В корзину"}
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 text-brand mr-2" />
                <h3 className="font-semibold">Информация о доставке</h3>
              </div>
              <p className="text-sm text-gray-700">
                Доставка осуществляется по всему региону. 
                Стоимость доставки зависит от объема заказа и расстояния.
                Для уточнения деталей свяжитесь с нашим менеджером.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
