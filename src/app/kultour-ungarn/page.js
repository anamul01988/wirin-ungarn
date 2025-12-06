"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";
import HungarianQuiz from "@/components/pages/kulturUngarn/KulturUngarnQuize";
import Breadcrumb from "@/components/_components/Breadcrumb";
// import VocabGame from "@/components/pages/vocabGame/VocabGame";

export default function KultourUngarnModal() {
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
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        // size={"lg"}
        dismiss={{
          enabled: false,
        }}
        className="common_diallog__area dialog-content bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
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

        <DialogBody className="overflow-auto custom__modal_area flex-1 mr-1">
          <HungarianQuiz />
        </DialogBody>
      </Dialog>
      <div className="min-h-screen flex items-center justify-center"></div>
    </>
  );
}
