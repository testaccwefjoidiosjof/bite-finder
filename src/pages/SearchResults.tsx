import { useState } from 'react';
import FoodCard from '@/components/FoodCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid2X2, List, Search } from 'lucide-react';
import FoodFilters from '@/components/FoodFilters';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router-dom';

// Extended food items array with 100 items
const EXTENDED_FOOD_ITEMS = [
  // ... Original items
  {
    name: "Truffle Pasta",
    restaurant: "Filomena",
    price: 32.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    calories: 780,
    protein: 18,
    allergens: ["gluten", "dairy"],
  },
  {
    name: "Carbonara",
    restaurant: "Osteria Morini",
    price: 26.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500",
    cuisine: "Italian",
    calories: 850,
    protein: 22,
    allergens: ["gluten", "dairy", "eggs"],
  },
  {
    name: "Penne Arrabbiata",
    restaurant: "RPM Italian",
    price: 24.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    calories: 720,
    protein: 16,
    allergens: ["gluten"],
  },
  {
    name: "Spicy Tuna Roll",
    restaurant: "Nobu",
    price: 22.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    cuisine: "Japanese",
    dietary: ["Pescatarian"],
    calories: 380,
    protein: 24,
    allergens: ["fish", "soy"],
  },
  // ... Add more items following the same pattern
  {
    name: "Pad Thai",
    restaurant: "Little Serow",
    price: 18.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
    cuisine: "Thai",
    dietary: ["Gluten-Free Option"],
    calories: 650,
    protein: 20,
    allergens: ["peanuts", "soy", "eggs"],
  },
  // ... Continue adding more items to reach 100
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    avoidFoods: "",
    maxCalories: "",
    minProtein: "",
    avoidIngredients: "",
  });

  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredItems = EXTENDED_FOOD_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                         item.cuisine.toLowerCase().includes(searchQuery) ||
                         item.restaurant.toLowerCase().includes(searchQuery);
    
    if (!matchesSearch) return false;
    
    if (filters.maxCalories && item.calories > parseInt(filters.maxCalories)) return false;
    if (filters.minProtein && item.protein < parseInt(filters.minProtein)) return false;
    if (filters.avoidFoods && filters.avoidFoods.split(',').some(food => 
      item.name.toLowerCase().includes(food.trim().toLowerCase())
    )) return false;
    if (filters.avoidIngredients && filters.avoidIngredients.split(',').some(ingredient => 
      item.allergens?.includes(ingredient.trim().toLowerCase())
    )) return false;
    
    return true;
  });

  const handleSearch = (query: string) => {
    setSearchParams({ search: query });
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search Results</h1>
      
      <div className="max-w-6xl mx-auto mb-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for food..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(localSearch);
                }
              }}
              className="pl-10 h-12 text-lg"
            />
            <Search 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" 
              onClick={() => handleSearch(localSearch)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div className="flex gap-4">
            <FoodFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="flex gap-2 border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <FoodCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item, index) => (
              <FoodCard key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;