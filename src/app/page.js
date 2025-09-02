"use client";

import HomePage from "@/components/pages/home/Home";
import { Footer } from "@/components/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      <HomePage />
      <Footer />
    </main>
  );
}
