
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
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
  );
};

export default HomeHero;
