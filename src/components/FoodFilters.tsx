import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

interface FiltersProps {
  filters: {
    avoidFoods: string;
    maxCalories: string;
    minProtein: string;
    avoidIngredients: string;
    maxPrice: string;
    search: string;
  };
  setFilters: (filters: any) => void;
}

const FoodFilters = ({ filters, setFilters }: FiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Input
        placeholder="Search foods..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, search: e.target.value }))
        }
        className="w-64"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="max-price">Maximum Price ($)</Label>
              <Input
                id="max-price"
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev: any) => ({ ...prev, maxPrice: e.target.value }))
                }
                placeholder="e.g., 30"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avoid-foods">Foods to Avoid (comma-separated)</Label>
              <Input
                id="avoid-foods"
                value={filters.avoidFoods}
                onChange={(e) =>
                  setFilters((prev: any) => ({ ...prev, avoidFoods: e.target.value }))
                }
                placeholder="e.g., peanuts, shellfish"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-calories">Maximum Calories</Label>
              <Input
                id="max-calories"
                type="number"
                value={filters.maxCalories}
                onChange={(e) =>
                  setFilters((prev: any) => ({ ...prev, maxCalories: e.target.value }))
                }
                placeholder="e.g., 800"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="min-protein">Minimum Protein (g)</Label>
              <Input
                id="min-protein"
                type="number"
                value={filters.minProtein}
                onChange={(e) =>
                  setFilters((prev: any) => ({ ...prev, minProtein: e.target.value }))
                }
                placeholder="e.g., 20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avoid-ingredients">Ingredients to Avoid (comma-separated)</Label>
              <Input
                id="avoid-ingredients"
                value={filters.avoidIngredients}
                onChange={(e) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    avoidIngredients: e.target.value,
                  }))
                }
                placeholder="e.g., dairy, gluten"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FoodFilters;
