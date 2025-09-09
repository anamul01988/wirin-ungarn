"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import DatenschutzDetails from "@/components/pages/datenschutz/DatenschutzDetails";

export default function DatenschutzModal() {
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
        size={"md"}
        dismiss={{
          enabled: false,
        }}
        className="bg-white relative border-4 border-green-700 rounded-2xl max-h-[90vh] h-[80vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <div
            className="absolute flex flex-col space-y-3 z-50"
            style={{
              top: "-0.5rem",
              right: "-10rem",
            }}
          >
            {/* Cross Icon */}
            <button onClick={handleClose} className="p-4 rounded-full">
              <img
                src="/assets/icons/close.png"
                alt="Close Icon"
                className="w-4rem h-3rem"
              />
            </button>

            {/* Love Icon */}

            <button className="p-4 rounded-full">
              <img
                src="/assets/icons/favorit_e.png"
                alt="Love Icon"
                className="w-3rem h-2rem"
              />
            </button>
          </div>
        )}

        <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1">
          <DatenschutzDetails onBack={handleBackToMenu} />
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
