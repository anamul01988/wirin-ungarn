"use client";

import HomePageLayout from "@/components/_components/HomePageLayout";

export default function CommonLayout({ children }) {
  return (
    <>
      <HomePageLayout />
      {children}
    
    </>
  );
}
