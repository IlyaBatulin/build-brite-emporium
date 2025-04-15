
import { Category } from "@/types";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/catalog/${category.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={category.image} 
            alt={category.name} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold text-lg">{category.name}</h3>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
