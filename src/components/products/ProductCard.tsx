
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const existingItem = items.find(item => item.product.id === product.id);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {!product.inStock && (
            <Badge 
              className="absolute top-2 right-2 bg-gray-700"
              variant="secondary"
            >
              Под заказ
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="pt-4 pb-2 flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="font-bold text-lg text-gray-900">{product.price.toLocaleString()} ₽/{product.unit}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none rounded-l-md" 
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="px-3 py-1">{quantity}</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none rounded-r-md" 
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleAddToCart}
            className="bg-brand hover:bg-brand-dark h-8"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            {existingItem ? "Добавить еще" : "В корзину"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
