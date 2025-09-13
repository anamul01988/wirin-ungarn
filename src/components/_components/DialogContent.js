"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import CollapsibleComment from "./CollapsibleComment";
export default function DialogContent({ title, content, imageFeature }) {
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
            <button onClick={navigateToHome} className="p-4 rounded-full">
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
          <div>
            <div className="mb-4">
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
            </div>
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            {imageFeature && (
              <>
                <div
                  className="w-full h-56 md:h-72 bg-cover bg-center rounded-lg mb-6"
                  style={{
                    backgroundImage: `url('${imageFeature}')`,
                  }}
                ></div>

                <div>
                  <p>Jeder hat sicher seinen eigenen Weg, wie er sich den Zugang zur ungarischen Sprache ebnet. Und es gibt sicher auch genug Menschen hier, die Ungarisch gar nicht lernen wollen.
Bis zu dem Tag an dem ich irgendwo gelesen hatte, dass man „einfach“ nur die Struktur realisieren muss und beginnen sollte in „Tabellen“ zu denken, mit der die Grammatik gebaut ist, war es echt schwer etwas zu behalten. Die Wörter hörten sich wie unmerkbare Trümmer an, weit ab vom europäischen Sprachverständnis.</p>
                </div>

                <div className="w-full max-w-3xl mx-auto p-6">
                  {/* Next Lesson Button */}
                  <div className="flex justify-end">
                    <button className="flex items-center justify-between border border-[#436f4d] text-[#436f4d] px-4 py-2 hover:bg-green-50 transition">
                      <span className="mr-2 text-sm font-semibold">
                        Die Ursprünge der Ungarischen Sprache: Ein <br /> Blick in die
                        Geschichte
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#436f4d]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-[#436f4d] my-6"></div>

                  {/* Collapsible Comment Component */}
                  <CollapsibleComment />
                </div>
              </>
            )}
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
