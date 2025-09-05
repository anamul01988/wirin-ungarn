"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import SubMenu from "../pages/home/SubMenu";
import Indetails from "../pages/home/Indetails";
import Wissenswert from "@/app/wissenswert/page";

export default function ImpressumModal() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showWissenswert, setShowWissenswert] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleShowDetails = (title) => {
    setSelectedTitle(title);
    setShowDetails(true);
  };

  const handleBackToMenu = () => {
    setShowDetails(false);
  };

  const handleWin=()=>{
     setShowWissenswert(true) 
  }

  return (
    <>
      <Button onClick={handleOpen} color="blue" size="lg" className="px-6 py-3">
        Open Recipe Modal
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        size={showDetails ? "lg" : "md"}
        className="bg-white relative border-4 border-green-700 rounded-2xl max-h-[90vh] h-[80vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <div
            className="absolute flex flex-col space-y-3 z-50"
            style={{
              top: "-0.5rem",
              right: showDetails ? "-10rem" : "-20rem",
            }}
          >
            {/* Cross Icon */}
            <button onClick={handleOpen} className="p-4 rounded-full">
              <img
                src="/assets/close.png"
                alt="Close Icon"
                className="w-4rem h-3rem"
              />
            </button>

            {/* Love Icon */}
            {showDetails && (
              <button className="p-4 rounded-full">
                <img
                  src="/assets/favorit_e.png"
                  alt="Love Icon"
                  className="w-3rem h-2rem"
                />
              </button>
            )}
          </div>
        )}

        {/* Outside Arrow Buttons */}
        {open && !showDetails && (
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
                src="/assets/arrow-left.png"
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
                src="/assets/arrow-right.png"
                alt="Next"
                className="w-3.5rem h-4.4rem"
              />
            </button>
          </>
        )}
        {showDetails ? (
          <DialogBody className="overflow-auto px-[60px] py-[30px] flex-1">
            <Indetails title={selectedTitle} onBack={handleBackToMenu} />
          </DialogBody>
        ) : (
          <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1">
            <SubMenu onTitleClick={handleShowDetails} />
          </DialogBody>
        )}
      </Dialog>
    </>
  );
}
