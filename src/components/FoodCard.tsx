import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import FoodDetailsDialog from './FoodDetailsDialog';

interface FoodCardProps {
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  image: string;
  cuisine: string;
  dietary?: string[];
  calories?: number;
  protein?: number;
  allergens?: string[];
}

const MOCK_REVIEWS = [
  {
    author: "Sarah J.",
    rating: 5,
    comment: "Absolutely amazing! The flavors were perfectly balanced.",
    date: "2024-02-15"
  },
  {
    author: "Mike R.",
    rating: 4,
    comment: "Really good, but a bit pricey for the portion size.",
    date: "2024-02-10"
  },
  {
    author: "Lisa M.",
    rating: 5,
    comment: "My new favorite! The quality is consistently excellent.",
    date: "2024-02-05"
  }
];

const FoodCard = ({ 
  name, 
  restaurant, 
  price, 
  rating, 
  image, 
  cuisine, 
  dietary,
  calories,
  protein,
  allergens 
}: FoodCardProps) => {
  return (
    <FoodDetailsDialog
      name={name}
      restaurant={restaurant}
      price={price}
      rating={rating}
      image={image}
      cuisine={cuisine}
      dietary={dietary}
      calories={calories}
      protein={protein}
      allergens={allergens}
      reviews={MOCK_REVIEWS}
    >
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
    </FoodDetailsDialog>
  );
};

export default FoodCard;