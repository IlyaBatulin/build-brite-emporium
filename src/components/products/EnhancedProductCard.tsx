
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus, Minus, Ruler, Droplet, Award } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EnhancedProductCardProps {
  product: Product;
}

const EnhancedProductCard = ({ product }: EnhancedProductCardProps) => {
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
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-3 py-2">
            <span className="text-xs text-white font-medium">{product.category}</span>
          </div>
        </div>
      </Link>
      
      <CardContent className="pt-4 pb-2 flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 mb-2 hover:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {product.woodType && (
            <Badge variant="outline" className="text-xs bg-amber-50 border-amber-200 text-amber-800">
              {product.woodType}
            </Badge>
          )}
          {product.purpose && (
            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-800">
              {product.purpose}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-gray-600 mb-3">
          {product.thickness && product.width && product.length && (
            <div className="flex items-center">
              <Ruler className="h-3 w-3 mr-1" />
              <span>{product.thickness}×{product.width}×{product.length} мм</span>
            </div>
          )}
          {product.moisture && (
            <div className="flex items-center">
              <Droplet className="h-3 w-3 mr-1" />
              <span>{product.moisture.split('(')[0]}</span>
            </div>
          )}
          {product.grade && (
            <div className="flex items-center">
              <Award className="h-3 w-3 mr-1" />
              <span>{product.grade}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <p className="font-bold text-lg text-gray-900">{product.price.toLocaleString()} ₽/{product.unit}</p>
        </div>
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

export default EnhancedProductCard;
