
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { categories, getPopularProducts } from "@/data/mockData";
import ProductCard from "@/components/products/ProductCard";
import CategoryCard from "@/components/categories/CategoryCard";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import HouseVisualizer from "@/components/visualizer/HouseVisualizer";
import FloatingCallButton from "@/components/common/FloatingCallButton";
import { Truck, Package, Clock, Phone, ArrowRight, Settings, BarChart3, CalculatorIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types"; // Added missing import

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("calculator");
  
  useEffect(() => {
    setPopularProducts(getPopularProducts());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-800 to-brand-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/lumber-yard.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto py-16 px-4 md:py-24 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Больше чем стройматериалы
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-lg">
              От фундамента до кровли - все материалы для вашего строительства
              с доставкой по всему региону.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-brand-800 hover:bg-gray-100 shadow-lg hover:shadow-xl">
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-800">
                <Link to="/contacts">Связаться с нами</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/images/lumber-stack.jpg"
                alt="Качественные стройматериалы"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-xl font-semibold">
                  Профессиональный подход к каждому проекту
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              variants={itemVariants}
            >
              <div className="bg-brand-50 p-3 rounded-full mr-4 shadow-sm">
                <Truck className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Быстрая доставка</h3>
                <p className="text-sm text-gray-600">По городу от 3 часов</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              variants={itemVariants}
            >
              <div className="bg-brand-50 p-3 rounded-full mr-4 shadow-sm">
                <Package className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Широкий ассортимент</h3>
                <p className="text-sm text-gray-600">Более 10 000 наименований</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              variants={itemVariants}
            >
              <div className="bg-brand-50 p-3 rounded-full mr-4 shadow-sm">
                <Clock className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Удобный график</h3>
                <p className="text-sm text-gray-600">Работаем с 9:00 до 18:00</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              variants={itemVariants}
            >
              <div className="bg-brand-50 p-3 rounded-full mr-4 shadow-sm">
                <Phone className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Консультации</h3>
                <p className="text-sm text-gray-600">Профессиональная помощь</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Calculator and Visualizer Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="text-center mb-6">
              <h2 className="inline-block text-2xl md:text-3xl font-bold text-gray-800 mb-2 relative">
                Инструменты для расчета и визуализации
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 opacity-75 rounded"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Воспользуйтесь нашими интерактивными инструментами, чтобы рассчитать стоимость материалов и визуально подобрать их для вашего дома
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-white border shadow-sm">
                  <TabsTrigger value="calculator" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 px-6 flex items-center gap-2">
                    <CalculatorIcon className="h-4 w-4" />
                    Калькулятор
                  </TabsTrigger>
                  <TabsTrigger value="visualizer" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 px-6 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Конструктор дома
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="calculator" className="mt-0">
                <div className="flex justify-center">
                  <PriceCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="visualizer" className="mt-0">
                <HouseVisualizer />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="inline-block text-2xl md:text-3xl font-bold text-gray-800 relative">
              Категории товаров
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 opacity-75 rounded"></div>
            </h2>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/catalog" className="flex items-center">
                Все категории <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categories.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants} custom={index}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="inline-block text-2xl md:text-3xl font-bold text-gray-800 relative">
              Популярные товары
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 opacity-75 rounded"></div>
            </h2>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/catalog" className="flex items-center">
                Все товары <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {popularProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants} custom={index}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-green-800 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/warehouse.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Нужна консультация по выбору материалов?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-green-50">
              Наши специалисты помогут подобрать оптимальные материалы для вашего проекта
              с учетом всех требований и бюджета.
            </p>
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-lg hover:shadow-xl">
              <Link to="/contacts">Связаться с нами</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating Call Button */}
      <FloatingCallButton />
    </Layout>
  );
};

export default HomePage;
