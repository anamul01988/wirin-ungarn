"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import Indetails from "@/components/pages/home/Indetails";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";

export default function WissenswertModal() {
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
            onFavorite={() => console.log('Favorite clicked')}
            onLayers={() => console.log('Layers clicked')}
            onShare={() => console.log('Share clicked')}
          />
        )}

        <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1">
          <Indetails onBack={handleBackToMenu} />
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
