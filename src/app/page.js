"use client";

import LandingPage from "@/components/_components/LandingPage";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/_components/LoginModal";
import RegisterModal from "@/components/_components/RegisterModal";
import ForgotPasswordModal from "@/components/_components/ForgotPasswordModal";
import ResetPasswordModal from "@/components/_components/ResetPasswordModal";
import ProfileDropdown from "@/components/_components/ProfileDropdown";
import CalendarMenu from "@/components/_components/CalendarMenu";
import PageHistoryMenu from "@/components/_components/PageHistoryMenu";
import FavoritenMenu from "@/components/_components/FavoritenMenu";
import "./calendarMenu.css";
// import HomePage from "@/components/pages/home/Home";
// import { Footer } from "@/components/ui";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const { isAuthenticated, loading } = useAuth();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToForgotPassword = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleBackToLogin = () => {
    setIsForgotPasswordModalOpen(false);
    setIsResetPasswordModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToResetPassword = () => {
    setIsResetPasswordModalOpen(true);
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

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

          <div className="calendar-item">
            <button className="header-btn flex items-center gap-1">
              <span className="ht_text">06.08. Zsuzsanna</span>{" "}
              <Image
                src="/assets/calendar.png"
                alt="calendar"
                width={15}
                height={15}
              />
            </button>
            <CalendarMenu />
          </div>

          <div className="calendar-item">
            <button className="header-btn">
              <span className="ht_text">meine Seiten-Historie</span> 📅
            </button>
            <PageHistoryMenu />
          </div>
        </nav>
        <nav className="header-buttons">
          <div className="calendar-item">
            <button className="header-btn favorites flex items-center">
              <span className="ht_text">Favoriten</span>{" "}
              <Image
                src="/assets/favorit.png"
                alt="favorit"
                width={15}
                height={15}
              />
            </button>
            <FavoritenMenu />
          </div>
          {loading ? (
            <div className="header-btn register flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            </div>
          ) : isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <div className="flex flex-col gap-2">
              <button
                className="header-btn register"
                onClick={handleLoginClick}
              >
                <span className="ht_text">Anmelden</span>
              </button>
            </div>
          )}
        </nav>
      </header>
      <LandingPage />
      {/* <HomePage /> */}
      {/* <Footer /> */}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgotPasswordModal}
        onBackToLogin={handleBackToLogin}
      />
      <Suspense fallback={<div className="hidden" />}>
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={handleCloseResetPasswordModal}
          onBackToLogin={handleBackToLogin}
        />
      </Suspense>
    </div>
  );
}
