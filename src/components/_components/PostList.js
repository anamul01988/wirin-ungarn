"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Wissenswert from "../pages/wissenswert/page";
import ModalIcons from "./ModalIcons";
export default function PostList({ initialApiData }) {
  const route = useRouter();
  const [open, setOpen] = useState(false);
  //   const [showDetails, setShowDetails] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  // Escape key closes modal
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  const navigateToHome = () => {
    route.push("/");
  };

  // console.log("Initial API Data in PostList:", initialApiData);
  return (
    <>
      <Dialog
        open={open}
        dismiss={{
          enabled: false,
        }}
        handler={handleOpen}
        size={"lg"}
        className="bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl  h-[96vh] flex flex-col"
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

        <DialogBody className="overflow-auto px-[60px] py-[30px] flex-1">
          <Wissenswert initialData={initialApiData} />
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
