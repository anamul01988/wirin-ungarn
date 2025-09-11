"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function DialogContent({ title, content }) {
  const [open, setOpen] = useState(true);
  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const navigateToHome = () => {
    route.back();
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        dismiss={{ enabled: false }}
        className="bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <div
            className="absolute flex flex-col space-y-3 z-50"
            style={{ top: "-0.5rem", right: "-8rem" }}
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

        {/* Dialog Body */}
        <DialogBody className="overflow-auto px-[30px] py-[30px] flex-1">
          <div className="mt-8">
            {/* Keep Navigate Button */}
            <Button
              onClick={navigateToHome}
              color="blue"
              size="lg"
              className="px-6 py-3 capitalize mt-6"
            >
              Navigate to Home
            </Button>
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
