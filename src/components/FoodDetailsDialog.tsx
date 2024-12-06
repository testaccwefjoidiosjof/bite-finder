import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Star, X } from "lucide-react";
import { Card } from "./ui/card";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface FoodDetailsProps {
  children: ReactNode;
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
  reviews: Review[];
}

const FoodDetailsDialog = ({ 
  children,
  name, 
  restaurant, 
  price, 
  rating, 
  image, 
  cuisine, 
  dietary,
  calories,
  protein,
  allergens,
  reviews 
}: FoodDetailsProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="animate-in fade-in-0 zoom-in-95 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-10 bg-white/80 hover:bg-white/90 rounded-full"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="h-64 relative">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-muted-foreground mb-4">{restaurant}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Details</h3>
                <p className="text-primary font-bold text-xl mb-2">${price.toFixed(2)}</p>
                <div className="flex items-center mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{cuisine}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nutrition</h3>
                {calories && <p className="text-sm">Calories: {calories}</p>}
                {protein && <p className="text-sm">Protein: {protein}g</p>}
                {allergens && allergens.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-destructive">Allergens:</p>
                    <p className="text-sm">{allergens.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.author}</p>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'fill-primary text-primary' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{review.date}</p>
                    <p className="text-sm">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FoodDetailsDialog;