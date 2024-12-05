import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">About Bite</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            As someone who has always been a picky eater with food allergies, I understand the daily struggle of finding the right food. It's not just about finding a good restaurant – it's about finding specific dishes that meet our unique needs and preferences.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            While platforms like Google and Yelp excel at showing popular restaurants, they fall short when it comes to finding specific dishes, especially when you have dietary restrictions or are budget-conscious. Finding detailed nutrition information often feels like searching for a needle in a haystack.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            That's why I created Bite. We focus on individual dishes rather than just restaurants, making it easier to:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Find budget-friendly options that actually taste good</li>
            <li>Filter out allergens and ingredients you want to avoid</li>
            <li>Track nutritional information for health-conscious dining</li>
            <li>Discover specific dishes that match your dietary preferences</li>
          </ul>
          
          <p className="text-lg leading-relaxed">
            Our mission is to make dining out less stressful and more enjoyable for everyone, whether you're dealing with allergies, following a specific diet, or simply trying to stick to a budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;