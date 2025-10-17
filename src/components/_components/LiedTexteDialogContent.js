"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ModalIcons from "./ModalIcons";
export default function LiedTexteDialogContent({
  title,
  content,
  //   imageFeature = "",
}) {
  const [open, setOpen] = useState(true);
  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  // Escape key closes modal
  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // const navigateToHome = () => {
  //   route.push("/");
  // };
  console.log("LiedTexteDialogContent content:", content);
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        dismiss={{ enabled: false }}
        className="bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl h-[96vh] flex flex-col"
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
        {/* Dialog Body */}
        <DialogBody className="overflow-auto custom__modal_area flex-1">
          <div>
            {/* <div className="mb-4">
              <button
                onClick={navigateToHome}
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
            </div> */}
            <h1 className="text-3xl font-bold mb-6">{title}</h1>

            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-sm leading-relaxed text-left mb-2"
            >
              {content?.introText}
            </Typography>

            {content?.postContent?.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex pt-10 items-start justify-start mb-2">
                  <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
                    <div
                      className="w-full h-full cursor-pointer"
                      style={{
                        background:
                          "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                      }}
                    >
                      <div>
                        {item.icon && item.icon.length > 0 ? (
                          <Image
                            src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/${item.icon[0]}.png`}
                            alt={item.icon[0]}
                            width={70}
                            height={70}
                            className="w-full h-auto"
                          />
                        ) : (
                          <svg
                            className="w-full h-auto text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 
             6.707a1 1 0 010-1.414l3-3a1 1 0 
             011.414 0l3 3a1 1 0 01-1.414 
             1.414L11 5.414V13a1 1 0 
             11-2 0V5.414L7.707 6.707a1 
             1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 pl-3">
                    {/* Content */}
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="text-sm leading-relaxed text-left mb-2"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            /> */}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
