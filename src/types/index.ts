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

export const thicknesses = [25, 30, 40, 50, 100, 150, 200];
export const widths = [50, 100, 150, 200];
export const lengths = [3000, 6000];

// Updated wood type categories
export const coniferousTypes = ['Сосна', 'Ель'];
export const deciduousTypes = ['Дуб', 'Бук', 'Ясень', 'Ольха', 'Берёза'];
export const exoticTypes = ['Тик', 'Махагони', 'Венге', 'Мербау', 'Ироко', 'Зебрано', 'Палисандр'];

export const woodTypes = [...coniferousTypes, ...deciduousTypes, ...exoticTypes];

export const grades = ['0 сорт (высший)', '1 сорт', '2 сорт', '3 сорт', '4 сорт'];
export const moistures = ['Естественная влажность (18–22%)', 'Камерная сушка (8–12%)'];
export const surfaceTreatments = ['Обрезная', 'Необрезная', 'Строганная', 'Шпунтованная'];
export const purposes = ['Строительство', 'Отделка', 'Мебельное производство', 'Декор'];

// Lumber specific types
export type LumberCategory = 'Доска обрезная' | 'Брус обрезной' | 'Брусок';

export const lumberCategories: { [key in LumberCategory]: string } = {
  'Доска обрезная': 'Пиломатериалы толщиной до 100мм',
  'Брус обрезной': 'Пиломатериалы сечением от 100x100мм',
  'Брусок': 'Пиломатериалы сечением до 100x100мм',
};

// Standard lumber sizes with their descriptions
export const standardLumberSizes = [
  // Доска обрезная
  { thickness: 25, width: 100, length: 6000, type: 'Доска обрезная', piecesPerM3: 66 },
  { thickness: 25, width: 150, length: 6000, type: 'Доска обрезная', piecesPerM3: 44 },
  { thickness: 25, width: 200, length: 6000, type: 'Доска обрезная', piecesPerM3: 33 },
  { thickness: 30, width: 100, length: 6000, type: 'Доска обрезная', piecesPerM3: 55 },
  { thickness: 30, width: 150, length: 6000, type: 'Доска обрезная', piecesPerM3: 37 },
  { thickness: 30, width: 200, length: 6000, type: 'Доска обрезная', piecesPerM3: 27 },
  { thickness: 40, width: 100, length: 6000, type: 'Доска обрезная', piecesPerM3: 41 },
  { thickness: 40, width: 150, length: 6000, type: 'Доска обрезная', piecesPerM3: 27 },
  { thickness: 40, width: 200, length: 6000, type: 'Доска обрезная', piecesPerM3: 20 },
  { thickness: 50, width: 100, length: 6000, type: 'Доска обрезная', piecesPerM3: 33 },
  { thickness: 50, width: 150, length: 6000, type: 'Доска обрезная', piecesPerM3: 22 },
  { thickness: 50, width: 200, length: 6000, type: 'Доска обрезная', piecesPerM3: 16 },
  
  // Брус обрезной
  { thickness: 100, width: 100, length: 6000, type: 'Брус обрезной', piecesPerM3: 16 },
  { thickness: 100, width: 150, length: 6000, type: 'Брус обрезной', piecesPerM3: 11 },
  { thickness: 100, width: 200, length: 6000, type: 'Брус обрезной', piecesPerM3: 8 },
  { thickness: 150, width: 150, length: 6000, type: 'Брус обрезной', piecesPerM3: 7 },
  { thickness: 150, width: 200, length: 6000, type: 'Брус обрезной', piecesPerM3: 5 },
  { thickness: 200, width: 200, length: 6000, type: 'Брус обрезной', piecesPerM3: 4 },
  
  // Брусок
  { thickness: 25, width: 50, length: 3000, type: 'Брусок', piecesPerM3: 266 },
  { thickness: 50, width: 50, length: 6000, type: 'Брусок', piecesPerM3: 66 },
  { thickness: 50, width: 50, length: 3000, type: 'Брусок', piecesPerM3: 132 }
];

export const getProductDescription = (
  type: LumberCategory,
  thickness: number,
  width: number,
  length: number,
  woodType: string = 'хвоя',
  grade: string = '1 сорт',
  moisture: string = 'свежий лес'
): string => {
  const size = standardLumberSizes.find(
    s => s.thickness === thickness && 
    s.width === width && 
    s.length === length && 
    s.type === type
  );

  if (!size) {
    return '';
  }

  return `${type} ${thickness}x${width}x${length} мм, ${woodType}, ${grade}, ${moisture}, ГОСТ ${size.piecesPerM3 ? `- ${size.piecesPerM3} шт. м³` : ''}`;
};
