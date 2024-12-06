import { useState, useEffect } from 'react';
import FoodCard from '@/components/FoodCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button, Input } from '@/components/ui/button';
import { Grid2X2, List, Star } from 'lucide-react';
import FoodFilters from '@/components/FoodFilters';
import FoodDetailsDialog from '@/components/FoodDetailsDialog';
import { useLocation } from 'react-router-dom';

const FOOD_ITEMS = [
  {
    name: "Wagyu Burger",
    restaurant: "The Capital Grille",
    price: 24.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    cuisine: "American",
    dietary: ["Gluten-Free Option"],
    calories: 850,
    protein: 45,
    allergens: ["dairy"],
  },
  {
    name: "Wagyu Burger",
    restaurant: "Morton's Steakhouse",
    price: 28.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    cuisine: "American",
    dietary: ["Gluten-Free Option"],
    calories: 900,
    protein: 48,
    allergens: ["dairy"],
  },
  {
    name: "Dragon Roll",
    restaurant: "Sushi Ko",
    price: 18.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    cuisine: "Japanese",
    dietary: ["Pescatarian"],
    calories: 450,
    protein: 20,
    allergens: ["fish", "soy"],
  },
  {
    name: "Dragon Roll",
    restaurant: "Sushi Taro",
    price: 22.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    cuisine: "Japanese",
    dietary: ["Pescatarian"],
    calories: 420,
    protein: 22,
    allergens: ["fish", "soy"],
  },
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
    name: "Truffle Pasta",
    restaurant: "RPM Italian",
    price: 36.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    calories: 800,
    protein: 20,
    allergens: ["gluten", "dairy"],
  },
  {
    name: "Butter Chicken",
    restaurant: "Rasika",
    price: 21.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cuisine: "Indian",
    dietary: ["Gluten-Free"],
    calories: 650,
    protein: 35,
    allergens: ["dairy"],
  },
  {
    name: "Butter Chicken",
    restaurant: "Bombay Club",
    price: 24.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cuisine: "Indian",
    dietary: ["Gluten-Free"],
    calories: 680,
    protein: 32,
    allergens: ["dairy"],
  }
];

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

const BestRated = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [cuisine, setCuisine] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    avoidFoods: "",
    maxCalories: "",
    minProtein: "",
    avoidIngredients: "",
    maxPrice: "",
    search: ""
  });

  // Get search param from URL if it exists
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  // Set initial search query from URL params
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const filteredItems = FOOD_ITEMS
    .filter(item => {
      // Search filter
      if (searchQuery) {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter(item => {
      if (priceRange === "budget") return item.price < 15;
      if (priceRange === "mid") return item.price >= 15 && item.price < 25;
      if (priceRange === "high") return item.price >= 25;
      return true;
    })
    .filter(item => cuisine === "all" || item.cuisine.toLowerCase() === cuisine.toLowerCase())
    .filter(item => {
      if (filters.maxCalories && item.calories > parseInt(filters.maxCalories)) return false;
      if (filters.minProtein && item.protein < parseInt(filters.minProtein)) return false;
      if (filters.avoidFoods && filters.avoidFoods.split(',').some(food => 
        item.name.toLowerCase().includes(food.trim().toLowerCase())
      )) return false;
      if (filters.avoidIngredients && filters.avoidIngredients.split(',').some(ingredient => 
        item.allergens?.includes(ingredient.trim().toLowerCase())
      )) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Best Rated Food in DMV</h1>
      
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div className="flex gap-4 w-full md:w-auto mb-4 md:mb-0">
            <Input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[300px]"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Select onValueChange={setPriceRange} defaultValue={priceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Under $15</SelectItem>
                <SelectItem value="mid">$15 - $25</SelectItem>
                <SelectItem value="high">$25+</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setCuisine} defaultValue={cuisine}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cuisine Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="american">American</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="vietnamese">Vietnamese</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSortBy} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <FoodFilters filters={filters} setFilters={setFilters} />

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
              <FoodDetailsDialog key={index} {...item} reviews={MOCK_REVIEWS}>
                <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < item.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-primary">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-secondary px-2 py-0.5 rounded-full text-xs">{item.cuisine}</span>
                        {item.dietary?.map((diet) => (
                          <span key={diet} className="bg-secondary px-2 py-0.5 rounded-full text-xs">
                            {diet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FoodDetailsDialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestRated;
