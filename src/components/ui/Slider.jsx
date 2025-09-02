"use client";

import { useState, forwardRef, useImperativeHandle } from "react";

const Slider = forwardRef(function Slider({ slides = [] }, ref) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Expose imperative controls to parent (for external buttons)
  useImperativeHandle(ref, () => ({
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
  }));

  if (!slides.length) {
    return <div className="text-center text-gray-500">No slides available</div>;
  }

  return (
    <div className="w-full">
      {/* Slide Content */}
      <div className="max-w-md w-full">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {slides[currentSlide]?.title || `Slide ${currentSlide + 1}`}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {slides[currentSlide]?.content || slides[currentSlide]}
          </p>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Slider;
