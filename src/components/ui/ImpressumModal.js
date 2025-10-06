"use client";

import React, { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import SubMenu from "../pages/home/SubMenu";
import ModalIcons from "../_components/ModalIcons";

export default function ImpressumtModal({ open, setOpen, handleOpen }) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(!open);
  const route = useRouter();

  // Escape key closes modal
  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleOpen();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, handleOpen]);

  const handleShowDetails = (title) => {
    // setSelectedTitle(title);
    // setShowDetails(true);
    route.push("/wissenswert");
  };

  // const navigateToHome = () => {
  //   handleOpen();
  //   // route.push("/");
  // };

  return (
    <div className="relative">
      {/* Custom backdrop with blur effect and height restrictions */}
      {open && (
        <div
          className="fixed inset-0 z-40 shalar__dialog"
          style={{
            background: `
              linear-gradient(to bottom, transparent 0px, transparent 200px),
              linear-gradient(to top, transparent 0px, transparent 200px),
              rgba(0, 0, 0, 0.3)
            `,
            // backdropFilter: "blur(4px)",
            top: "100px",
            bottom: "100px",
            height: "calc(100vh - 200px)",
          }}
          onClick={handleOpen}
        />
      )}

      <div className="dialog-container" style={{ height: "100%" }}>
        <Dialog
          open={open}
          handler={handleOpen}
          dismiss={{
            enabled: false,
          }}
          size={"md"}
          className="bg-white relative border-4 border-green-700 rounded-2xl flex flex-col"
          style={{
            // maxHeight: "calc(80vh - 400px)",
            height: "calc(80vh - 80px)",
            background: "#fff !important",
            // height: "100%",
            // minHeight: "300px",
          }}
          backdrop={{
            enabled: false,
          }}
          data-dialog="impressum-modal"
        >
          {/* Floating Cross + Love Icons */}
          {open && (
            <ModalIcons
              onClose={handleOpen}
              onFavorite={() => console.log("Favorite clicked")}
              onLayers={() => console.log("Layers clicked")}
              onShare={() => console.log("Share clicked")}
              type="impressum"
              topIconsStyle={{
                top: "-0.5rem",
                right: "-20rem",
              }}
            />
          )}

          {/* Outside Arrow Buttons */}
          {open && (
            <>
              {/* Prev */}
              <button
                onClick={() =>
                  document.querySelector(".submenu-carousel .prev-btn").click()
                }
                className="absolute left-[-11rem] top-1/2 -translate-y-1/2 text-white rounded-full p-4 z-50"
                aria-label="Previous"
              >
                <img
                  src="/assets/icons/arrow-left.png"
                  alt="Previous"
                  className="w-4.5rem h-3.4rem"
                />
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  document.querySelector(".submenu-carousel .next-btn").click()
                }
                className="absolute right-[-11rem] top-1/2 -translate-y-1/2 text-white rounded-full p-4 z-50"
                aria-label="Next"
              >
                <img
                  src="/assets/icons/arrow-right.png"
                  alt="Next"
                  className="w-3.5rem h-4.4rem"
                />
              </button>
            </>
          )}

          <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1">
            <SubMenu onTitleClick={handleShowDetails} />
          </DialogBody>
        </Dialog>
      </div>
      {/* <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={navigateToHome}
          color="blue"
          size="lg"
          className="px-6 py-3 capitalize"
        >
          Impressum
        </Button>
      </div> */}
    </div>
  );
}
