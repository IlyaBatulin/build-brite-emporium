
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { categories, getPopularProducts } from "@/data/mockData";
import ProductCard from "@/components/products/ProductCard";
import CategoryCard from "@/components/categories/CategoryCard";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import HouseVisualizer from "@/components/visualizer/HouseVisualizer";
import { Category, Product } from "@/types";
import { Truck, Package, Clock, Phone } from "lucide-react";

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setPopularProducts(getPopularProducts());
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-800 to-brand-600 text-white">
        <div className="container mx-auto py-16 px-4 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Строительные материалы высокого качества
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-lg">
              От фундамента до кровли - все материалы для вашего строительства
              с доставкой по всему региону.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-brand-800 hover:bg-gray-100">
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-800">
                <Link to="/contacts">Связаться с нами</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&q=80&w=600"
              alt="Строительные материалы"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-50 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Быстрая доставка</h3>
                <p className="text-sm text-gray-600">По городу от 3 часов</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-50 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Широкий ассортимент</h3>
                <p className="text-sm text-gray-600">Более 10 000 наименований</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-50 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Удобный график</h3>
                <p className="text-sm text-gray-600">Работаем с 9:00 до 18:00</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-50 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Консультации</h3>
                <p className="text-sm text-gray-600">Профессиональная помощь</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive House Visualizer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Интерактивный конструктор дома
          </h2>
          <HouseVisualizer />
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Расчёт стоимости материалов
          </h2>
          <div className="flex justify-center">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Категории товаров</h2>
            <Button asChild variant="outline">
              <Link to="/catalog">Все категории</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Популярные товары</h2>
            <Button asChild variant="outline">
              <Link to="/catalog">Все товары</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Нужна консультация по выбору материалов?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Наши специалисты помогут подобрать оптимальные материалы для вашего проекта
            с учетом всех требований и бюджета.
          </p>
          <Button asChild size="lg" className="bg-white text-brand hover:bg-gray-100">
            <Link to="/contacts">Связаться с нами</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
