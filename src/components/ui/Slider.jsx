"use client";

import { useState } from "react";

export default function Slider({ slides = [] }) {
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

  if (!slides.length) {
    return <div className="text-center text-gray-500">No slides available</div>;
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Slide Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {slides[currentSlide]?.title || `Slide ${currentSlide + 1}`}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {slides[currentSlide]?.content || slides[currentSlide]}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
        disabled={slides.length <= 1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
        disabled={slides.length <= 1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="text-center mt-2 text-sm text-gray-500">
        {currentSlide + 1} of {slides.length}
      </div>
    </div>
  );
}
