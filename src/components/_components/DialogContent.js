"use client";

import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import CollapsibleComment from "./CollapsibleComment";
import ContactForm from "./ContactForm";
export default function DialogContent({
  title,
  content,
  imageFeature,
  imageAlt,
  excerpt,
  date,
  author,
  categories,
  tags,
  customFields,
  contentType,
}) {
  const [open, setOpen] = useState(true);

  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const navigateToHome = () => {
    route.back();
  };

  // Check if content contains a contact form
  const hasContactForm = content && content.includes("wpcf7-form");
  const isContactPage = title && title.toLowerCase().includes("kontakt");

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

            {/* Content Metadata */}
            <div className="mb-6 text-sm text-gray-600 space-y-2">
              {date && (
                <p>
                  <strong>Published:</strong>{" "}
                  {new Date(date).toLocaleDateString()}
                </p>
              )}
              {author && (
                <p>
                  <strong>Author:</strong> {author}
                </p>
              )}
              {contentType && (
                <p>
                  <strong>Type:</strong> {contentType}
                </p>
              )}
              {categories && categories.length > 0 && (
                <p>
                  <strong>Categories:</strong>{" "}
                  {categories.map((cat) => cat.name).join(", ")}
                </p>
              )}
              {tags && tags.length > 0 && (
                <p>
                  <strong>Tags:</strong>{" "}
                  {tags.map((tag) => tag.name).join(", ")}
                </p>
              )}
            </div>

            {/* Excerpt */}
            {excerpt && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 italic">{excerpt}</p>
              </div>
            )}

            {/* Custom Fields for Liedtexte */}
            {customFields && contentType === "liedtexte" && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                {customFields.introText && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Introduction:
                    </h3>
                    <p className="text-blue-700">{customFields.introText}</p>
                  </div>
                )}
                {customFields.shortTitle && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Short Title:
                    </h3>
                    <p className="text-blue-700">{customFields.shortTitle}</p>
                  </div>
                )}
                {customFields.postContent &&
                  customFields.postContent.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        Content Sections:
                      </h3>
                      <div className="space-y-2">
                        {customFields.postContent.map((section, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-blue-300 pl-4"
                          >
                            {section.title && (
                              <h4 className="font-medium text-blue-800">
                                {section.title}
                              </h4>
                            )}
                            {section.content && (
                              <p className="text-blue-700">{section.content}</p>
                            )}
                            {section.icon && (
                              <span className="text-blue-600">
                                {section.icon}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {imageFeature && (
              <div
                className="w-full h-56 md:h-72 bg-cover bg-center rounded-lg mb-6"
                style={{
                  backgroundImage: `url('${imageFeature}')`,
                }}
                role="img"
                aria-label={imageAlt || title}
              ></div>
            )}

            <div className="w-full max-w-3xl mx-auto p-6">
              {/* Next Lesson Button */}
              <div className="flex justify-end">
                <button className="flex items-center justify-between border border-[#436f4d] text-[#436f4d] px-4 py-2 hover:bg-green-50 transition">
                  <span className="mr-2 text-sm font-semibold">
                    Die Ursprünge der Ungarischen Sprache: Ein <br /> Blick in
                    die Geschichte
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
            {/* Render Contact Form or regular content */}
            {hasContactForm && isContactPage ? (
              <ContactForm formHtml={content} />
            ) : (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
