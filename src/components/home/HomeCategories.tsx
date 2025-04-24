
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";
import CategoryCard from "@/components/categories/CategoryCard";

const HomeCategories = () => {
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
  );
};

export default HomeCategories;
