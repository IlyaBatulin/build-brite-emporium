
import { Product, Category } from "@/types";

// Mock Categories
export const categories: Category[] = [
  {
    id: "lumber",
    name: "Пиломатериалы",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=500&h=500"
  },
  {
    id: "building-materials",
    name: "Стройматериалы",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500"
  },
  {
    id: "hardware",
    name: "Метизы",
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?auto=format&fit=crop&q=80&w=500&h=500"
  },
  {
    id: "tools",
    name: "Инструменты",
    image: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&q=80&w=500&h=500"
  },
  {
    id: "paints",
    name: "Лакокрасочные материалы",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500"
  },
  {
    id: "insulation",
    name: "Теплоизоляционные материалы",
    image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500"
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: "1",
    name: "Доска обрезная 25х100х6000",
    description: "Доска обрезная из хвойных пород древесины. Применяется в строительстве для обшивки стен, потолка, настила полов, изготовления опалубки.",
    price: 180,
    image: "https://images.unsplash.com/photo-1520627977056-c307aeb9a625?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Пиломатериалы",
    inStock: true,
    unit: "м"
  },
  {
    id: "2",
    name: "Брус 100х100х6000",
    description: "Брус из хвойных пород древесины. Применяется в строительстве для силовых конструкций каркасов, стропильных систем.",
    price: 650,
    image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Пиломатериалы",
    inStock: true,
    unit: "шт"
  },
  {
    id: "3",
    name: "Цемент ПЦ-400 50 кг",
    description: "Портландцемент марки 400 производства Евроцемент. Применяется для приготовления бетонных смесей и штукатурных растворов.",
    price: 360,
    image: "https://images.unsplash.com/photo-1571217668979-f46db8864f75?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Стройматериалы",
    inStock: true,
    unit: "мешок"
  },
  {
    id: "4",
    name: "Гвозди строительные 100x4.0 мм",
    description: "Гвозди строительные оцинкованные для крепления деревянных элементов конструкций.",
    price: 180,
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Метизы",
    inStock: true,
    unit: "кг"
  },
  {
    id: "5",
    name: "Дрель ударная Bosch GSB 13 RE",
    description: "Профессиональная ударная дрель для работы по бетону, металлу и дереву. Мощность 600 Вт, диаметр сверления бетона до 13 мм.",
    price: 4900,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Инструменты",
    inStock: true,
    unit: "шт"
  },
  {
    id: "6",
    name: "Краска фасадная Dulux 10л",
    description: "Водно-дисперсионная фасадная краска для наружных работ. Устойчива к атмосферным воздействиям и УФ-излучению.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Лакокрасочные материалы",
    inStock: true,
    unit: "шт"
  },
  {
    id: "7",
    name: "Пенопласт ПСБ-С-25 50мм",
    description: "Теплоизоляционные плиты из пенополистирола для утепления стен, полов, кровли.",
    price: 250,
    image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Теплоизоляционные материалы",
    inStock: false,
    unit: "лист"
  },
  {
    id: "8",
    name: "Кирпич облицовочный красный",
    description: "Кирпич керамический лицевой одинарный красного цвета для облицовки фасадов.",
    price: 25,
    image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Стройматериалы",
    inStock: true,
    unit: "шт"
  },
  {
    id: "9",
    name: "Рулетка Stanley 5м",
    description: "Профессиональная рулетка с автостопом и магнитным крючком. Длина ленты 5 метров.",
    price: 890,
    image: "https://images.unsplash.com/photo-1613485252551-056834a5425f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Инструменты",
    inStock: true,
    unit: "шт"
  },
  {
    id: "10",
    name: "Саморезы по дереву 4.0x40 мм",
    description: "Оцинкованные саморезы для крепления деревянных конструкций.",
    price: 220,
    image: "https://images.unsplash.com/photo-1615486363973-f79d875780cf?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Метизы",
    inStock: true,
    unit: "кг"
  },
  {
    id: "11",
    name: "Утеплитель ROCKWOOL 50мм",
    description: "Минераловатный утеплитель для теплоизоляции стен, потолков и кровли. Размер листа 1000x600 мм.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Теплоизоляционные материалы",
    inStock: true,
    unit: "упаковка"
  },
  {
    id: "12",
    name: "Фанера ФСФ 12мм 1525x1525",
    description: "Водостойкая фанера для строительных работ, опалубки, настила полов.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Пиломатериалы",
    inStock: true,
    unit: "лист"
  }
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  const categoryName = categories.find(cat => cat.id === categoryId)?.name;
  return categoryName ? products.filter(product => product.category === categoryName) : [];
};

// Helper function to get a product by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function for search
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

// Get popular products (just a random selection for demo purposes)
export const getPopularProducts = (): Product[] => {
  return products.slice(0, 6);
};
