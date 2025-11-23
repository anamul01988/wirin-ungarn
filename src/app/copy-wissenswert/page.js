"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import Wissenswert from "@/components/pages/wissenswert/page";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";

export default function WissenswertModal() {
  const [open, setOpen] = useState(false);
  //   const [showDetails, setShowDetails] = useState(false);

  const handleOpen = () => setOpen(!open);
  const route = useRouter();

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
        dismiss={{
          enabled: false,
        }}
        handler={handleOpen}
        size={"lg"}
        className="bg-white relative border-4 border-green-700 rounded-2xl  h-[96vh] flex flex-col"
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

        <DialogBody className="overflow-auto px-[60px] py-[30px] flex-1">
          <Wissenswert />
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
