import SearchBar from '@/components/SearchBar';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById('why-choose-bite');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="search-container text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Bite</h1>
          <p className="text-muted-foreground mb-8">Discover the best food in the DMV area</p>
          <SearchBar />
        </div>
        <div 
          className="absolute bottom-8 animate-bounce cursor-pointer"
          onClick={scrollToContent}
          role="button"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <div id="why-choose-bite" className="min-h-[80vh] bg-secondary/30 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bite?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-muted-foreground">We know the DMV area inside and out, helping you discover hidden gems.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Curated Selection</h3>
              <p className="text-muted-foreground">Only the best makes it to our list. Quality is our top priority.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Real Reviews</h3>
              <p className="text-muted-foreground">Authentic ratings and reviews from food lovers like you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;