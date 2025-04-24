
import { motion } from "framer-motion";
import { Truck, Package, Clock, Phone } from "lucide-react";

const benefits = [
  {
    icon: <Truck className="h-6 w-6 text-brand" />,
    title: "Быстрая доставка",
    description: "По городу от 3 часов"
  },
  {
    icon: <Package className="h-6 w-6 text-brand" />,
    title: "Широкий ассортимент",
    description: "Более 10 000 наименований"
  },
  {
    icon: <Clock className="h-6 w-6 text-brand" />,
    title: "Удобный график",
    description: "Работаем с 9:00 до 18:00"
  },
  {
    icon: <Phone className="h-6 w-6 text-brand" />,
    title: "Консультации",
    description: "Профессиональная помощь"
  }
];

const HomeBenefits = () => {
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              variants={itemVariants}
            >
              <div className="bg-brand-50 p-3 rounded-full mr-4 shadow-sm">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBenefits;
