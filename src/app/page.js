"use client";

import HomePage from "@/components/pages/home/Home";
import { useRef, useState } from "react";
import {
  Button,
  Modal,
  Footer,
  Slider,
} from "@/components/ui";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  const slideData = [
    {
      title: "Welcome to Our Platform",
      content: "This is the first slide with some introductory text. Here you can learn about what we offer and how we can help you achieve your goals."
    },
    {
      title: "Explore Features",
      content: "This is the second slide that showcases our amazing features. Discover all the tools and capabilities that make our platform unique and powerful."
    },
    {
      title: "Get Started Today",
      content: "This is the third slide encouraging you to take action. Join thousands of users who are already benefiting from our innovative solutions."
    }
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      <Button onClick={handleOpenModal}>
        Click me
      </Button>

      {/* Modal with Slider */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Close Button outside the card */}
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 text-white hover:text-gray-200 text-3xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
          {/* Outer layer with left/right buttons positioned outside the card */}
          <div className="flex items-center gap-4 w-full max-w-3xl px-4">
            {/* Prev button - outside card */}
            <button
              onClick={() => sliderRef.current?.prev?.()}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Modal card */}
            <div className="bg-white rounded-lg p-6 flex-1 relative">
            
            
            {/* Slider Component */}
              <Slider ref={sliderRef} slides={slideData} />
            </div>

            {/* Next button - outside card */}
            <button
              onClick={() => sliderRef.current?.next?.()}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <HomePage />
      <Footer />
    </main>
  );
}
