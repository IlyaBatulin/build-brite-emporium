
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trash2, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Ошибка оформления заказа",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send the order to your backend
    console.log("Order submitted:", {
      customer: { name, phone, email, address },
      items,
      totalPrice,
      comment
    });
    
    // Show success message and clear cart
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 max-w-3xl">
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Ваш заказ принят!</h1>
            <p className="text-lg mb-6">
              Спасибо за ваш заказ. Наш менеджер свяжется с вами в ближайшее время 
              для подтверждения заказа и уточнения деталей доставки.
            </p>
            <Button asChild size="lg">
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Ваша корзина пуста</h1>
          <p className="text-lg text-gray-600 mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button asChild size="lg">
            <Link to="/catalog">Перейти в каталог</Link>
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
          Продолжить покупки
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold">Товары в корзине</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-500 text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Очистить
                </Button>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4 flex items-center">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-grow">
                      <Link 
                        to={`/product/${item.product.id}`} 
                        className="font-medium hover:text-brand transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm">{item.product.price.toLocaleString()} ₽/{item.product.unit}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none rounded-l-md" 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="px-3 py-1 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none rounded-r-md" 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <span className="font-medium min-w-[7rem] text-right">
                        {(item.product.price * item.quantity).toLocaleString()} ₽
                      </span>

                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary and Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="font-semibold mb-4">Итого</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Товары ({items.length}):</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <div className="border-t border-gray-100 my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Общая сумма:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-4">Оформление заказа</h2>
              <form onSubmit={handleSubmitOrder}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-____"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Адрес доставки
                    </label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Введите адрес доставки"
                    />
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-1">
                      Комментарий к заказу
                    </label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Дополнительная информация к заказу"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand hover:bg-brand-dark"
                    size="lg"
                  >
                    Оформить заказ
                  </Button>

                  <p className="text-xs text-gray-500">
                    Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями обработки персональных данных.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
