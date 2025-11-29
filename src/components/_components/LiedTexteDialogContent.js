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
import Breadcrumb from "./Breadcrumb";
export default function LiedTexteDialogContent({
  title,
  content,
  routePrefix,
  nextPostSlug,
  prevPostSlug,
  nextPostTitle,
  prevPostTitle,
  isSinglePage,
  //   imageFeature = "",
}) {
  const [open, setOpen] = useState(true);
  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  // Truncate title helper function
  const truncateTitle = (title, maxLength = 30) => {
    if (!title) return "";
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  // Navigate to next post
  const handleNextPost = () => {
    if (nextPostSlug && routePrefix) {
      route.push(`/${routePrefix}/${nextPostSlug}`);
    }
  };

  // Navigate to previous post
  const handlePrevPost = () => {
    if (prevPostSlug && routePrefix) {
      route.push(`/${routePrefix}/${prevPostSlug}`);
    }
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
        className={`dialog-liedtexte-content ${
          isSinglePage ? `${routePrefix}_single-page` : "archive__page"
        } bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl h-[96vh] flex flex-col`}
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
        <DialogBody className="overflow-auto custom__modal_area flex-1 mr-1 p-[30px]">
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
            <div className="mb-2 px-0 pt-0">
              <Breadcrumb className="text-sm" isSinglePage={true} />
            </div>
            <p className="text-[30px] text-[#436f4d] font-medium mb-4">
              {title}
            </p>

            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-[16px] text-[#436f4d] font-normal leading-relaxed text-left mb-2"
            >
              {content?.introText}
            </Typography>

            {content?.postContent?.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex pt-5 items-start justify-start mb-2">
                  <div className="flex-shrink-0 flex items-start mr-3">
                    <div className="w-full h-full cursor-pointer">
                      <div>
                        {item.icon && item.icon.length > 0 ? (
                          <img
                            src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/${item.icon[0]}.png`}
                            alt={item.icon[0]}
                            height={50}
                            width={50}
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

                  <div className="flex-1 liedtexte_content pl-3">
                    <h3
                      className="font-[500] text-[24px] text-[#436f4d] mb-2"
                      style={{ lineHeight: "34px" }}
                    >
                      {item.title}
                    </h3>
                    {/* Content */}
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="text-sm leading-relaxed text-left mb-2 font-normal text-[#436f4d]"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Next/Previous Post Navigation */}
            {(prevPostSlug || nextPostSlug) && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div>
                  {prevPostSlug ? (
                    <button
                      onClick={handlePrevPost}
                      className="flex items-center justify-between border border-[#436f4d] text-[#436f4d] px-4 py-2 hover:bg-green-50 transition"
                      title={prevPostTitle || "Previous post"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="text-sm font-semibold">
                        {truncateTitle(prevPostTitle, 25)}
                      </span>
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  {nextPostSlug && (
                    <button
                      onClick={handleNextPost}
                      className="flex items-center justify-between border border-[#436f4d] text-[#436f4d] px-4 py-2 hover:bg-green-50 transition"
                      title={nextPostTitle || "Next post"}
                    >
                      <span className="mr-2 text-sm font-semibold">
                        {truncateTitle(nextPostTitle, 25)}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
