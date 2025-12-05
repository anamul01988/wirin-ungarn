"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DefaultSpinner } from "@/components/_components/Spinners";
import ModalIcons from "@/components/_components/ModalIcons";
import { useRouter } from "next/navigation";
import { Dialog, DialogBody } from "@material-tailwind/react";
import Breadcrumb from "@/components/_components/Breadcrumb";
import "./style.css";

export default function SingleVerbariumPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const [open, setOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    setOpen(true);
    // Construct the iframe URL - adjust this to your actual WordPress URL
    setIframeUrl(`https://wir-in-ungarn.hu/verbarium/${slug}/?iframe=true`);
  }, [slug]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.push("/verbarium");
    }, 300);
  };

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  if (!slug) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DefaultSpinner />
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        handler={() => {}}
        size="lg"
        dismiss={{
          enabled: false,
        }}
        className="dialog-verbarium bg-white relative border-4 border-[#406c4d] rounded-2xl h-[96vh] flex flex-col"
      >
        {/* Floating Cross Icon */}
        {open && (
          <ModalIcons
            onClose={handleClose}
            onFavorite={() => console.log("Favorite clicked")}
            onLayers={() => console.log("Layers clicked")}
            onShare={() => console.log("Share clicked")}
          />
        )}

        <DialogBody className="overflow-hidden verbarium__singlePage mr-1 custom__modal_area flex-1 p-0">
          <Breadcrumb />
          <h1
            className="text-[#494158] mt-3"
            style={{
              fontSize: "30px",
              fontWeight: "500",
              color: "#494158",
              textTransform: "capitalize",
            }}
          >
            {slug}
          </h1>
          <div className="relative w-full h-full">
            {isIframeLoading && (
              <div className="absolute inset-0 bg-gray-50 rounded-lg flex flex-col items-center justify-center z-10">
                <div className="min-h-screen flex items-center justify-center">
                  <DefaultSpinner />
                </div>
              </div>
            )}
            {iframeUrl ? (
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0"
                title={`Verbarium: ${slug}`}
                loading="lazy"
                onLoad={handleIframeLoad}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <DefaultSpinner />
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
