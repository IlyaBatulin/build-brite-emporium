
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContactsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { name, email, message });
    
    toast({
      title: "Сообщение отправлено",
      description: "Спасибо! Мы свяжемся с вами в ближайшее время",
    });
    
    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Контактная информация</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Details */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Наши контакты</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-brand mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Адрес</h3>
                    <p className="text-gray-600">ул. Строительная, 123, г. Москва, 123456</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-brand mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Телефон</h3>
                    <p className="text-gray-600">
                      <a href="tel:+74951234567" className="hover:text-brand">
                        +7 (495) 123-45-67
                      </a>
                      <br />
                      <a href="tel:+74951234568" className="hover:text-brand">
                        +7 (495) 123-45-68
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-brand mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@vybor-plus.ru" className="hover:text-brand">
                        info@vybor-plus.ru
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-brand mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Режим работы</h3>
                    <p className="text-gray-600">
                      Пн-Пт: 9:00-18:00<br />
                      Сб: 9:00-16:00<br />
                      Вс: выходной
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Напишите нам</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Ваше имя <span className="text-red-500">*</span>
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
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Сообщение <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишите ваше сообщение..."
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand hover:bg-brand-dark"
              >
                Отправить сообщение
              </Button>
            </form>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Как нас найти</h2>
          <div className="aspect-video w-full bg-gray-200 rounded-lg">
            {/* Here you would include an actual map component */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">
                Здесь будет карта с расположением магазина
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;
