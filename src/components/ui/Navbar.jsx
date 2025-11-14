"use client";

import { cn } from "@/lib/cn";

export default function Card({ className, children }) {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-md", className)}>
      {children}
    </div>
  );
}
