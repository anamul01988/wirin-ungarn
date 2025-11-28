"use client";

import HomePageLayout from "@/components/_components/HomePageLayout";

export default function CommonLayout({ children }) {
  return (
    <>
      {/* {children} */}
      {children}
      <HomePageLayout />
    </>
  );
}
