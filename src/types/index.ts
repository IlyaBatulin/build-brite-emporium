
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  unit: string; // шт, м², кг, etc.
  // Lumber specific attributes
  woodType?: string;
  thickness?: number;
  width?: number;
  length?: number;
  grade?: string;
  moisture?: string;
  surfaceTreatment?: string;
  purpose?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  parentId?: string;
  subCategories?: Category[];
}

export interface FilterOptions {
  categories: string[];
  woodTypes: string[];
  thicknesses: number[];
  widths: number[];
  lengths: number[];
  grades: string[];
  moistures: string[];
  surfaceTreatments: string[];
  purposes: string[];
}

// Predefined filter values
export const woodTypes = [
  'Сосна', 'Ель', 'Дуб', 'Бук', 'Ясень', 'Ольха', 'Берёза',
  'Тик', 'Махагони', 'Венге', 'Мербау', 'Ироко', 'Зебрано', 'Палисандр'
];

export const thicknesses = [16, 19, 22, 25, 30, 32, 40, 45, 50, 60, 70, 75, 80, 90, 100];
export const widths = [60, 70, 75, 80, 90, 100, 110, 120, 125, 130, 150, 180, 200, 225, 250, 275];
export const lengths = [3000, 4000, 6000, 6500, 7000];
export const grades = ['0 сорт (высший)', '1 сорт', '2 сорт', '3 сорт'];
export const moistures = ['Естественная влажность (18–22%)', 'Камерная сушка (8–12%)'];
export const surfaceTreatments = ['Обрезная', 'Необрезная', 'Строганная', 'Шпунтованная'];
export const purposes = ['Строительство', 'Отделка', 'Мебельное производство', 'Декор'];
