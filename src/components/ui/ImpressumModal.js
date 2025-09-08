"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import SubMenu from "../pages/home/SubMenu";

export default function ImpressumtModal({ open, setOpen, handleOpen }) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(!open);
  const route = useRouter();
  const handleShowDetails = (title) => {
    // setSelectedTitle(title);
    // setShowDetails(true);
    route.push("/wissenwert");
  };

  // const navigateToHome = () => {
  //   handleOpen();
  //   // route.push("/");
  // };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{
          enabled: false,
        }}
        size={"md"}
        className="bg-white relative border-4 border-green-700 rounded-2xl max-h-[90vh] h-[80vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <div
            className="absolute flex flex-col space-y-3 z-50"
            style={{
              top: "-0.5rem",
              right: "-20rem",
            }}
          >
            {/* Cross Icon */}
            <button onClick={handleOpen} className="p-4 rounded-full">
              <img
                src="/assets/icons/close.png"
                alt="Close Icon"
                className="w-4rem h-3rem"
              />
            </button>
          </div>
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
    </>
  );
}
