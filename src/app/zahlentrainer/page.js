"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";
import Breadcrumb from "@/components/_components/Breadcrumb";
// import TimetellingGame from "@/components/pages/timetellingGame/TimetellingGame";
import HungarianNumberGame from "@/components/pages/zhaltrainer/ZhaltrainerNumberGame";

export default function ZahlentrainerModal() {
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
        className="dialog-zahlentrainer bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
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
          {/* Breadcrumb */}
          {/* <div className="mb-2 px-0 pt-0">
            <Breadcrumb className="text-sm" />
          </div> */}

          <HungarianNumberGame />
        </DialogBody>
      </Dialog>
      <div className="min-h-screen flex items-center justify-center">
        {/* <Button
          onClick={navigateToHome}
          color="blue"
          size="lg"
          className="px-6 py-3 capitalize"
        >
          Navigate to Home
        </Button> */}
      </div>
    </>
  );
}
