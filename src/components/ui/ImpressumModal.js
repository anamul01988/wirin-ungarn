"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import SubMenu from "../pages/home/SubMenu";
import Indetails from "../pages/home/Indetails";

export default function ImpressumModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} color="blue" size="lg" className="px-6 py-3">
        Open Recipe Modal
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="bg-white relative border-4 border-green-700 rounded-2xl max-h-[90vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <div
            className="absolute flex flex-col space-y-3 z-50"
            style={{ top: "-0.5rem", right: "-7rem" }}
          >
            {/* Cross Icon */}
            <button
              onClick={handleOpen}
              className="bg-white p-4 rounded-full shadow-lg border-2 border-green-600 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-8 w-8 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Love Icon */}
            <button className="bg-white p-4 rounded-full shadow-lg border-2 border-green-600 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-green-700"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 
                       3.41 0.81 4.5 2.09C13.09 3.81 
                       14.76 3 16.5 3 19.58 3 22 5.42 
                       22 8.5c0 3.78-3.4 6.86-8.55 
                       11.54L12 21.35z"
                />
              </svg>
            </button>
          </div>
        )}

        <DialogBody
          className="overflow-auto px-[60px] py-[30px] flex-1"
          // style={{ padding: "30px 60px" }}
        >
          {/* <Indetails/> */}
          <SubMenu />
        </DialogBody>
      </Dialog>
    </>
  );
}
