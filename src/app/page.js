import LandingPage from "@/components/_components/LandingPage";
import HomePage from "@/components/pages/home/Home";
import { Footer } from "@/components/ui";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-start bg-gray-100 main__page"
      // style={{
      //   backgroundImage: 'url("/assets/pattern-bg.jpg")',
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   width: "100%",
      // }}
    >
      <header className="header w-full">
        <nav className="header-buttons">
          <button className="header-btn">
            <span className="ht_text">Währungsrechner</span> EUR ⇔ HUF
          </button>
          <button className="header-btn">
            <span className="ht_text">06.08. Zsuzsanna</span> 📅
          </button>
          <button className="header-btn">
            <span className="ht_text">meine Seiten-Historie</span>
          </button>
        </nav>
        <nav className="header-buttons">
          <button className="header-btn favorites">
            <span className="ht_text">Favoriten</span> ❤
          </button>
          <button className="header-btn register">
            <span className="ht_text">Anmelden</span>
          </button>
        </nav>
      </header>
      <LandingPage />
      {/* <HomePage /> */}
      {/* <Footer /> */}
    </div>
  );
}
