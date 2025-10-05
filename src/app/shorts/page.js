"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
// import CookieDetails from "@/components/pages/cookie/CookieDetails";
import ShortsPage from "@/components/pages/shorts/ShortsPage";
import ModalIcons from "@/components/_components/ModalIcons";

export default function Shorts() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const route = useRouter();

  const handleBackToMenu = () => {
    route.back();
  };
  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const navigateToHome = () => {
    route.push("/");
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size={"lg"}
        dismiss={{
          enabled: false,
        }}
        className="bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <ModalIcons
            onClose={handleClose}
            onFavorite={() => console.log("Favorite clicked")}
            onLayers={() => console.log("Layers clicked")}
            onShare={() => console.log("Share clicked")}
          />
        )}

        <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1 custom__modal_area border-0">
          {handleBackToMenu && (
            <button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
              aria-label="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div className="mt-8">
            <ShortsPage />
          </div>
        </DialogBody>
      </Dialog>
      <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={navigateToHome}
          color="blue"
          size="lg"
          className="px-6 py-3 capitalize"
        >
          Navigate to Home
        </Button>
      </div>
    </>
  );
}
