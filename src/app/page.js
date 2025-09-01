"use client";

import { Button } from "@material-tailwind/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      {/* Custom Tailwind color */}
      <Button className="bg-primaryRed text-white" size="lg">
        Hello Wirin-Ungarn 🚀
      </Button>

      {/* Material Tailwind color prop */}
      <div className="flex w-max gap-4">
        <Button color="blue">color blue</Button>
        <Button color="red">color red</Button>
        <Button color="green">color green</Button>
        <Button color="amber">color amber</Button>
      </div>
    </main>
  );
}
