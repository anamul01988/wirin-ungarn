"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";
import Breadcrumb from "@/components/_components/Breadcrumb";
import VenastaltusngskalendarPage from "@/components/pages/veranstaltungen/venastaltusngskalendar/page";
import Loader from "@/components/_components/Loader";

export default function KarteComponent() {
  const [open, setOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const handleOpen = () => setOpen(true);
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
        size={"lg"}
        dismiss={{
          enabled: false,
        }}
        className="dialog-veranstaltungen bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl h-[96vh] flex flex-col"
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

        <DialogBody className="custom__modal_area overflow-auto flex-1 mr-1">
          <div className="mb-2 px-0 pt-0">
            <Breadcrumb className="text-sm" />
          </div>
          {/* Karte iframe */}
          <div className="w-full h-full relative">
            {/* Loading Skeleton */}
            {iframeLoading && (
              <div className="absolute inset-0 bg-gray-50 rounded-lg flex flex-col items-center justify-center z-10">
                <div className="min-h-screen flex items-center justify-center">
                  <Loader size="large" />
                </div>
              </div>
            )}

            {/* Iframe */}
            <iframe
              src="https://wir-in-ungarn.hu/karte/?iframe=true"
              className="w-full h-full border-0 rounded-lg"
              title="Karte - Wir in Ungarn"
              loading="lazy"
              allowFullScreen
              onLoad={() => setIframeLoading(false)}
            />
          </div>
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
