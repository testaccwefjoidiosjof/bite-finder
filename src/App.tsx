import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import BestRated from "./pages/BestRated";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="p-4 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary">Bite</Link>
            <Link to="/best-rated" className="text-gray-600 hover:text-primary transition-colors">
              Best Rated
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/best-rated" element={<BestRated />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;