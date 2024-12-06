export const FOOD_ITEMS = [
  {
    name: "Wagyu Burger",
    restaurant: "The Capital Grille",
    price: 24.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    cuisine: "American",
    dietary: ["Gluten-Free Option"],
    calories: 850,
    protein: 45,
    allergens: ["dairy"],
    reviews: [
      {
        author: "Sarah J.",
        rating: 5,
        comment: "Absolutely amazing! The flavors were perfectly balanced.",
        date: "2024-02-15"
      },
      {
        author: "Mike R.",
        rating: 2,
        comment: "Really overpriced for what you get. The meat was overcooked.",
        date: "2024-02-10"
      },
      {
        author: "Lisa M.",
        rating: 5,
        comment: "My new favorite! The quality is consistently excellent.",
        date: "2024-02-05"
      }
    ]
  },
  {
    name: "Tiramisu",
    restaurant: "Maggiano's",
    price: 12.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    calories: 450,
    protein: 8,
    allergens: ["dairy", "eggs", "gluten"],
    reviews: [
      {
        author: "David K.",
        rating: 4,
        comment: "Classic tiramisu, good coffee flavor.",
        date: "2024-02-18"
      },
      {
        author: "Rachel P.",
        rating: 3,
        comment: "A bit too sweet for my taste.",
        date: "2024-02-12"
      }
    ]
  },
  {
    name: "Chocolate Chip Cookies",
    restaurant: "Levain Bakery",
    price: 4.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    cuisine: "Dessert",
    dietary: ["Vegetarian"],
    calories: 140,
    protein: 2,
    allergens: ["dairy", "eggs", "gluten"],
    reviews: [
      {
        author: "Emma S.",
        rating: 5,
        comment: "Best cookies in DC! Perfectly chewy.",
        date: "2024-02-20"
      },
      {
        author: "Tom H.",
        rating: 1,
        comment: "Way too expensive for a cookie.",
        date: "2024-02-15"
      }
    ]
  },
  // Add 20+ more items following the same pattern...
];

export const MOCK_REVIEWS = [
  {
    author: "Sarah J.",
    rating: 5,
    comment: "Absolutely amazing! The flavors were perfectly balanced.",
    date: "2024-02-15"
  },
  {
    author: "Mike R.",
    rating: 2,
    comment: "Really overpriced for what you get. The portion size was tiny.",
    date: "2024-02-10"
  },
  {
    author: "Lisa M.",
    rating: 5,
    comment: "My new favorite! The quality is consistently excellent.",
    date: "2024-02-05"
  },
  {
    author: "John D.",
    rating: 1,
    comment: "Terrible experience. The food was cold and service was poor.",
    date: "2024-02-01"
  },
  {
    author: "Amy W.",
    rating: 4,
    comment: "Great flavors but a bit pricey for what you get.",
    date: "2024-01-28"
  }
];