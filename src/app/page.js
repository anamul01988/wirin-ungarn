import LandingPage from "@/components/_components/LandingPage";
import HomePage from "@/components/pages/home/Home";
import { Footer } from "@/components/ui";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 bg-gray-100 main__page"
      style={{
        backgroundImage: 'url("/assets/pattern-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <LandingPage />
      <HomePage />
      {/* <Footer /> */}
    </div>
  );
}
