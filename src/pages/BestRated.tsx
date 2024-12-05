import { useState } from 'react';
import FoodCard from '@/components/FoodCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FOOD_ITEMS = [
  {
    name: "Wagyu Burger",
    restaurant: "The Capital Grille",
    price: 24.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    cuisine: "American",
    dietary: ["Gluten-Free Option"]
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

  const filteredItems = FOOD_ITEMS
    .filter(item => {
      if (priceRange === "budget") return item.price < 15;
      if (priceRange === "mid") return item.price >= 15 && item.price < 25;
      if (priceRange === "high") return item.price >= 25;
      return true;
    })
    .filter(item => cuisine === "all" || item.cuisine.toLowerCase() === cuisine.toLowerCase())
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
        <div className="flex flex-wrap gap-4 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <FoodCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestRated;