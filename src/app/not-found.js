// pages/404.tsx
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="relative h-screen w-screen">
      <Image
        src="/assets/404-page-not-found.jpg"
        alt="404 - Page Not Found"
        fill
        priority
      />
    </div>
  );
}
