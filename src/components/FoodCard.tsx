import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface FoodCardProps {
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  image: string;
  cuisine: string;
  dietary?: string[];
}

const FoodCard = ({ name, restaurant, price, rating, image, cuisine, dietary }: FoodCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground mb-2">{restaurant}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary font-medium">${price.toFixed(2)}</span>
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-secondary px-2 py-1 rounded-full text-xs">{cuisine}</span>
          {dietary?.map((diet) => (
            <span key={diet} className="bg-secondary px-2 py-1 rounded-full text-xs">
              {diet}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;