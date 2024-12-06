import { useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const suggestions = [
    'Best Burgers in DC',
    'Top Rated Sushi Arlington',
    'Vegan Restaurants Bethesda',
    'Best Pizza Alexandria',
    'Butter Chicken DMV',
    'Dragon Roll DC'
  ];

  const handleSearch = (searchQuery: string) => {
    navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for the best food in DMV..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          className="pl-10 h-12 text-lg"
        />
        <Search 
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" 
          onClick={() => handleSearch(query)}
        />
      </div>
      {query && (
        <div className="absolute w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 z-10">
          {suggestions
            .filter(s => s.toLowerCase().includes(query.toLowerCase()))
            .map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(suggestion);
                  handleSearch(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;