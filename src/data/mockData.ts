import { Product, Category } from "@/types";

// Hierarchical Categories with parent-child relationship
export const categories: Category[] = [
  {
    id: "lumber",
    name: "Пиломатериалы",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: [
      {
        id: "cut-board",
        name: "Доска обрезная",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-cut-board",
        name: "Доска обрезная сухая",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-planed-board",
        name: "Доска строганная сухая",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "beam",
        name: "Брус",
        image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "small-beam",
        name: "Брусок",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-cut-beam",
        name: "Брус обрезной сухой",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-planed-beam",
        name: "Брус строганный сухой",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-planed-small-beam",
        name: "Брусок строганный сухой",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "dry-planed-rail",
        name: "Рейка строганная сухая",
        image: "https://images.unsplash.com/photo-1615920606214-6428b3324c74?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "profiled-beam",
        name: "Брус профилированный",
        image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "block-house",
        name: "Блок-хаус",
        image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "beam-imitation",
        name: "Имитация бруса",
        image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "euro-paneling",
        name: "Евровагонка",
        image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "shtil-paneling",
        name: "Вагонка Штиль",
        image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "planken",
        name: "Планкен",
        image: "https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "tongue-groove-board",
        name: "Шпунтованная доска",
        image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "terrace-board-velvet",
        name: "Террасная доска Вельвет",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      },
      {
        id: "furniture-thermo-board",
        name: "Мебельная и термодоска",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "lumber"
      }
    ]
  },
  {
    id: "wood-boards",
    name: "Фанера, OSB, ДВП, ДСП",
    image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: [
      {
        id: "fk-plywood",
        name: "Фанера ФК",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "fsf-plywood",
        name: "Фанера ФСФ",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "laminated-plywood",
        name: "Фанера ламинированная",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "fire-resistant-plywood",
        name: "Фанера трудногорючая",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "bakelite-plywood",
        name: "Фанера бакелитовая",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "osb",
        name: "Плита OSB (ОСП)",
        image: "https://images.unsplash.com/photo-1615486363973-f79d875780cf?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "mdf",
        name: "Плита МДФ",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "dvp",
        name: "Плита ДВП",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "dsp",
        name: "Плита ДСП",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      },
      {
        id: "quick-deck",
        name: "Плита ДСП влагостойкая Quick Deck",
        image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
        parentId: "wood-boards"
      }
    ]
  },
  {
    id: "aceid-csp",
    name: "АЦЭИД, ЦСП",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "concrete",
    name: "ЖБИ",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "roofing",
    name: "Кровля",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "general-construction",
    name: "Общестрой",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "films",
    name: "Пленки",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "insulation",
    name: "Утеплители",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  },
  {
    id: "wood-protection",
    name: "Защита для дерева",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    subCategories: []
  }
];

// Updated products with lumber-specific attributes
export const products: Product[] = [
  {
    id: "1",
    name: "Доска обрезная 25х100х6000",
    description: "Доска обрезная из хвойных пород древесины. Применяется в строительстве для обшивки стен, потолка, настила полов, изготовления опалубки.",
    price: 180,
    image: "https://images.unsplash.com/photo-1520627977056-c307aeb9a625?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Доска обрезная",
    inStock: true,
    unit: "м",
    woodType: "Сосна",
    thickness: 25,
    width: 100,
    length: 6000,
    grade: "1 сорт",
    moisture: "Естественная влажность (18–22%)",
    surfaceTreatment: "Обрезная",
    purpose: "Строительство"
  },
  {
    id: "2",
    name: "Брус 100х100х6000",
    description: "Брус из хвойных пород древесины. Применяется в строительстве для силовых конструкций каркасов, стропильных систем.",
    price: 650,
    image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Брус",
    inStock: true,
    unit: "шт",
    woodType: "Ель",
    thickness: 100,
    width: 100,
    length: 6000,
    grade: "2 сорт",
    moisture: "Естественная влажность (18–22%)",
    surfaceTreatment: "Обрезная",
    purpose: "Строительство"
  },
  {
    id: "3",
    name: "Доска строганная 20х90х6000",
    description: "Доска строганная сухая. Применяется в отделке помещений, изготовлении мебели, беседок, садовых построек.",
    price: 290,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Сухая строганная доска",
    inStock: true,
    unit: "м",
    woodType: "Сосна",
    thickness: 20,
    width: 90,
    length: 6000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "4",
    name: "Брусок сухой строганный 30х50х3000",
    description: "Брусок строганный камерной сушки. Применяется для обрешетки, каркасов, внутренней отделки.",
    price: 120,
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Сухой строганный брусок",
    inStock: true,
    unit: "шт",
    woodType: "Ель",
    thickness: 30,
    width: 50,
    length: 3000,
    grade: "1 сорт",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "5",
    name: "Имитация бруса 16х135х6000",
    description: "Имитация бруса из хвойных пород. Применяется для внутренней и наружной отделки стен.",
    price: 340,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Имитация бруса",
    inStock: true,
    unit: "м²",
    woodType: "Сосна",
    thickness: 16,
    width: 135,
    length: 6000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "6",
    name: "Евровагонка 12х90х6000",
    description: "Евровагонка камерной сушки. Применяется для внутренней отделки стен, потолков, балконов, саун.",
    price: 280,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Евровагонка",
    inStock: true,
    unit: "м²",
    woodType: "Сосна",
    thickness: 12,
    width: 90,
    length: 6000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "7",
    name: "Фанера ФСФ 12мм 1525x1525",
    description: "Водостойкая фанера для строительных работ, опалубки, настила полов.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1604187353254-2526faf17ffe?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Фанера ФСФ",
    inStock: false,
    unit: "лист",
    thickness: 12,
    width: 1525,
    length: 1525,
    grade: "2 сорт",
    purpose: "Строительство"
  },
  {
    id: "8",
    name: "Террасная доска 25x140x6000",
    description: "Террасная доска (декинг) для настила открытых площадок, террас, веранд, причалов.",
    price: 490,
    image: "https://images.unsplash.com/photo-1581084349663-25d57f3d94d5?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Террасная доска",
    inStock: true,
    unit: "м²",
    woodType: "Сосна",
    thickness: 25,
    width: 140,
    length: 6000,
    grade: "1 сорт",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "9",
    name: "Плинтус деревянный 16x45x3000",
    description: "Деревянный плинтус для оформления стыка стены и пола.",
    price: 120,
    image: "https://images.unsplash.com/photo-1613485252551-056834a5425f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Плинтус",
    inStock: true,
    unit: "шт",
    woodType: "Сосна",
    thickness: 16,
    width: 45,
    length: 3000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "10",
    name: "OSB-3 плита 12мм 2500x1250",
    description: "Ориентированно-стружечная плита повышенной влагостойкости для строительных и отделочных работ.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1615486363973-f79d875780cf?auto=format&fit=crop&q=80&w=500&h=500",
    category: "OSB-3",
    inStock: true,
    unit: "лист",
    thickness: 12,
    width: 2500,
    length: 1250,
    purpose: "Строительство"
  },
  {
    id: "11",
    name: "Брус профилированный 140x140x6000",
    description: "Профилированный брус камерной сушки для строительства домов, бань, беседок.",
    price: 1350,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Брус профилированный",
    inStock: true,
    unit: "шт",
    woodType: "Сосна",
    thickness: 140,
    width: 140,
    length: 6000,
    grade: "1 сорт",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Строительство"
  },
  {
    id: "12",
    name: "МДФ панель 16мм 2800x2070",
    description: "МДФ панель для производства мебели, дверей, отделки интерьеров.",
    price: 2400,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "МДФ",
    inStock: true,
    unit: "лист",
    thickness: 16,
    width: 2800,
    length: 2070,
    purpose: "Мебельное производство"
  },
  {
    id: "13",
    name: "Доска дубовая 30x200x4000",
    description: "Дубовая доска камерной сушки для изготовления мебели, лестниц, отделки интерьеров.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1620731777822-ebf8d43c9f0b?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Сухая обрезная доска",
    inStock: true,
    unit: "м",
    woodType: "Дуб",
    thickness: 30,
    width: 200,
    length: 4000,
    grade: "1 сорт",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Обрезная",
    purpose: "Мебельное производство"
  },
  {
    id: "14",
    name: "Планкен скошенный 20x140x6000",
    description: "Фасадная доска для наружной отделки зданий, фасадов, заборов.",
    price: 520,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Планкен",
    inStock: true,
    unit: "м²",
    woodType: "Лиственница",
    thickness: 20,
    width: 140,
    length: 6000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Строганная",
    purpose: "Отделка"
  },
  {
    id: "15",
    name: "Шпунтованная доска пола 35x135x6000",
    description: "Шпунтованная доска для настила полов в жилых и нежилых помещениях.",
    price: 580,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500&h=500",
    category: "Шпунтованная доска",
    inStock: true,
    unit: "м²",
    woodType: "Сосна",
    thickness: 35,
    width: 135,
    length: 6000,
    grade: "0 сорт (высший)",
    moisture: "Камерная сушка (8–12%)",
    surfaceTreatment: "Шпунтованная",
    purpose: "Отделка"
  }
];

// Function to get all unique categories as a flat list for filtering
export const getAllCategories = (): Category[] => {
  const flattenCategories = (categories: Category[]): Category[] => {
    return categories.reduce((acc: Category[], category) => {
      acc.push(category);
      if (category.subCategories && category.subCategories.length > 0) {
        acc = [...acc, ...flattenCategories(category.subCategories)];
      }
      return acc;
    }, []);
  };
  
  return flattenCategories(categories);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  // First find the category by id to get its name
  const flatCategories = getAllCategories();
  const category = flatCategories.find(cat => cat.id === categoryId);
  
  if (!category) return [];
  
  // Get products directly matching this category
  let result = products.filter(product => product.category === category.name);
  
  // If this is a parent category, also include products from subcategories
  const isParentCategory = flatCategories.some(cat => cat.parentId === categoryId);
  if (isParentCategory) {
    const childCategoryIds = flatCategories
      .filter(cat => cat.parentId === categoryId)
      .map(cat => cat.id);
      
    for (const childId of childCategoryIds) {
      result = [...result, ...getProductsByCategory(childId)];
    }
  }
  
  return result;
};

// Helper function to get a product by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get related products
export const getRelatedProducts = (productId: string, category: string): Product[] => {
  // Find products in the same category, excluding the current product
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === category
    )
    .slice(0, 4); // Return maximum 4 related products
};

// Helper function for search
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      (product.woodType && product.woodType.toLowerCase().includes(lowerQuery)) ||
      (product.purpose && product.purpose.toLowerCase().includes(lowerQuery))
  );
};

// Get popular products (just a random selection for demo purposes)
export const getPopularProducts = (): Product[] => {
  return products.slice(0, 6);
};
