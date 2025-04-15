
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/mockData";
import { Product } from "@/types";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Plus, Minus, ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Категория:</span>
              <Link to={`/catalog?category=${product.category}`} className="text-brand hover:underline">
                {product.category}
              </Link>
            </div>
            
            <div className="mb-6">
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium">
                  В наличии
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 font-medium">
                  Под заказ
                </Badge>
              )}
            </div>
            
            <p className="text-3xl font-bold mb-4">{product.price.toLocaleString()} ₽/{product.unit}</p>
            
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
