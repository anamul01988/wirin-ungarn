"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { fakeData } from "@/lib/utils/utils";

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
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 
                       8.5 2 5.42 4.42 3 7.5 3c1.74 0 
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
          style={{ padding: "30px 60px" }}
        >
          {/* Title + Icon */}
          <div className="flex items-start justify-start mb-6">
            <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
              <div
                className="w-full h-full"
                style={{
                  background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                }}
              >
                {fakeData.secondIcon}
              </div>
            </div>

            <div className="flex-1 pl-3">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold leading-snug mb-3"
              >
                {fakeData.title}
              </Typography>
              {/* Hero Image */}
              <div
                className="w-full h-56 md:h-72 bg-cover bg-center rounded-lg mb-6"
                style={{
                  backgroundImage: `url('${fakeData.heroImage}')`,
                }}
              ></div>
              {/* Content */}
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="text-sm leading-relaxed text-left mb-5"
              >
                {fakeData.content}
              </Typography>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex items-start justify-start mb-6">
            {/* Icon with fixed basis */}
            <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start justify-center mr-3">
              <div
                className="w-[100%] h-[100%]"
                style={{
                  background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                }}
              >
                {fakeData.secondIcon}
              </div>
            </div>

            {/* Title takes remaining space */}
            <div className="flex-1 pl-3">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold leading-snug mb-3"
              >
                {fakeData.secondTitle}
              </Typography>

              {/* Content */}
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="text-sm leading-relaxed text-left mb-5"
              >
                {fakeData.secondContent}
              </Typography>
            </div>
          </div>

          {/* Third Section */}
          <div className="flex items-start justify-start mb-6">
            {/* Icon with fixed basis */}
            <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start justify-center mr-3">
              <div
                className="w-[100%] h-[100%]"
                style={{
                  background: "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                }}
              >
                {fakeData.secondIcon}
              </div>
            </div>

            {/* Title takes remaining space */}
            <div className="flex-1 pl-3">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold leading-snug mb-3"
              >
                {fakeData.secondTitle}
              </Typography>

              {/* Content */}
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="text-sm leading-relaxed text-left mb-5"
              >
                {fakeData.secondContent}
              </Typography>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
