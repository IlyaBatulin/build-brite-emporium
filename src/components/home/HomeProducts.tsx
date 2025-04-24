
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getPopularProducts } from "@/data/mockData";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

const HomeProducts = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  
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
  );
};

export default HomeProducts;
