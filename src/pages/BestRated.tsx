import { useState } from 'react';
import FoodCard from '@/components/FoodCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid2X2, List, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    name: "Dragon Roll",
    restaurant: "Sushi Ko",
    price: 18.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    cuisine: "Japanese",
    dietary: ["Pescatarian"]
  },
  {
    name: "Truffle Pasta",
    restaurant: "Filomena",
    price: 32.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500",
    cuisine: "Italian",
    dietary: ["Vegetarian"]
  },
  {
    name: "Butter Chicken",
    restaurant: "Rasika",
    price: 21.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cuisine: "Indian",
    dietary: ["Gluten-Free"]
  },
  {
    name: "Fish Tacos",
    restaurant: "Oyamel",
    price: 16.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    cuisine: "Mexican",
    dietary: ["Dairy-Free"]
  },
  {
    name: "Pho",
    restaurant: "Pho 75",
    price: 14.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500",
    cuisine: "Vietnamese",
    dietary: ["Dairy-Free"]
  }
];

const BestRated = () => {
  const [priceRange, setPriceRange] = useState("all");
  const [cuisine, setCuisine] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    avoidFoods: "",
    maxCalories: "",
    minProtein: "",
    avoidIngredients: "",
  });

  const filteredItems = FOOD_ITEMS
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
        item.allergens.includes(ingredient.trim().toLowerCase())
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
          <div className="flex gap-4">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Dietary Filters</SheetTitle>
                  <SheetDescription>
                    Set your dietary preferences and restrictions
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="avoid-foods">Foods to Avoid (comma-separated)</Label>
                    <Input
                      id="avoid-foods"
                      value={filters.avoidFoods}
                      onChange={(e) => setFilters(prev => ({ ...prev, avoidFoods: e.target.value }))}
                      placeholder="e.g., peanuts, shellfish"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max-calories">Maximum Calories</Label>
                    <Input
                      id="max-calories"
                      type="number"
                      value={filters.maxCalories}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxCalories: e.target.value }))}
                      placeholder="e.g., 800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="min-protein">Minimum Protein (g)</Label>
                    <Input
                      id="min-protein"
                      type="number"
                      value={filters.minProtein}
                      onChange={(e) => setFilters(prev => ({ ...prev, minProtein: e.target.value }))}
                      placeholder="e.g., 20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="avoid-ingredients">Ingredients to Avoid (comma-separated)</Label>
                    <Input
                      id="avoid-ingredients"
                      value={filters.avoidIngredients}
                      onChange={(e) => setFilters(prev => ({ ...prev, avoidIngredients: e.target.value }))}
                      placeholder="e.g., dairy, gluten"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

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
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-muted-foreground">{item.restaurant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-medium">${item.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className={`text-sm ${i < item.rating ? 'text-primary' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-secondary px-2 py-1 rounded-full text-xs">{item.cuisine}</span>
                    {item.dietary?.map((diet) => (
                      <span key={diet} className="bg-secondary px-2 py-1 rounded-full text-xs">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestRated;
