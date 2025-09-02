"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  Footer,
  Slider,
} from "@/components/ui";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            
            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Information Slider
            </h2>
            
            {/* Slider Component */}
            <Slider slides={slideData} />
            
            {/* Modal Footer */}
            <div className="flex justify-center mt-6">
              <Button onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
