"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  // Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import CollapsibleComment from "./CollapsibleComment";
import ContactForm from "./ContactForm";
import ModalIcons from "./ModalIcons";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
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
  singlePostContent = [],
  routePrefix,
  postContent, // Add postContent prop
  postId,
  nextPostSlug, // Add nextPostSlug prop
  prevPostSlug, // Add prevPostSlug prop
  nextPostTitle, // Add nextPostTitle prop
  prevPostTitle, // Add prevPostTitle prop
}) {
  const [open, setOpen] = useState(true);

  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const navigateToHome = () => {
    route.push("/");
  };

  // Truncate title helper function
  const truncateTitle = (title, maxLength = 30) => {
    if (!title) return "";
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const handleNextPost = () => {
    if (nextPostSlug && routePrefix) {
      route.push(`/${routePrefix}/${nextPostSlug}`);
    }
  };

  const handlePrevPost = () => {
    if (prevPostSlug && routePrefix) {
      route.push(`/${routePrefix}/${prevPostSlug}`);
    }
  };

  // Log routePrefix and other props for debugging
  console.log("contentsssssssssssss", content);
  // if (contentType === "sprachkurs") {
  //   console.log("Sprachkurs postContent:", postContent);
  // }

  // const navigateToPreviousPage = () => {
  //   route.back();
  // };

  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Check if content contains a contact form
  const hasContactForm =
    typeof content === "string" && content?.includes("wpcf7-form");
  const isContactPage = title && title.toLowerCase().includes("kontakt");

  // console.log("DialogContent content:", content, typeof content, title);
  // console.log(
  //   "routePrefix & contentType:",
  //   routePrefix,
  //   contentType,
  //   typeof routePrefix,
  //   typeof contentType
  // );

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
          {/* Breadcrumb */}
          <div className="mb-4 px-4 pt-4">
            <Breadcrumb className="text-sm" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-black mb-6">{title}</h1>

            {/* {contentType === "wissenswert" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )} */}

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
              {/* {contentType && (
                <p>
                  <strong>Type:</strong> {contentType}
                </p>
              )} */}
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

            {/* Custom Fields for Kategorien with topicsPostContent */}
            {customFields &&
              contentType === "kategorien" &&
              customFields.topicsPostContent && (
                <div className="mb-6">
                  <h3 className="font-semibold text-green-800 mb-4 text-xl">
                    {customFields.shortTitle || "Kategorien"}
                  </h3>
                  <div className="space-y-8">
                    {customFields.topicsPostContent.map((section, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-300 pl-4"
                      >
                        {section.title && (
                          <h4 className="font-medium text-green-800 text-lg mb-2">
                            {section.title}
                          </h4>
                        )}
                        {section.content && (
                          <div
                            className="prose prose-sm max-w-none text-green-700"
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Custom Fields for Sprachkurs */}
            {/* {contentType === "sprachkurs" && (
              <div className="mb-6">
                {postContent?.sprachkursContent ? (
                  <div className="space-y-6">
                    {postContent.sprachkursContent.map((section, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-purple-300 pl-4"
                      >
                        {section.title && (
                          <h4 className="font-medium text-purple-800 text-lg mb-2">
                            {section.title}
                          </h4>
                        )}
                        {section.icon && section.icon.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {section.icon.map((iconName, iconIndex) => (
                              <span
                                key={iconIndex}
                                className="inline-block px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full"
                              >
                                {iconName}
                              </span>
                            ))}
                          </div>
                        )}
                        {section.content && (
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
              </div>
            )} */}

            {imageFeature && (
              <>
                <div
                  className="w-full h-56 md:h-72 bg-cover bg-center rounded-lg mb-6"
                  style={{
                    backgroundImage: `url('${imageFeature}')`,
                  }}
                  role="img"
                  aria-label={imageAlt || title}
                ></div>
              </>
            )}
            {contentType === "einfach-lesen" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <p className="text-center text-[32px] font-bold mt-4">
                  Hello vai ! render here as you wish )::
                </p>
              </div>
            )}
            {contentType === "wissenswert" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-0 items-start justify-start mb-2">
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
                        <h3 className="font-semibold text-20px text-[#436f4d] mb-2">
                          {item.title}
                        </h3>
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
              </div>
            )}

            {contentType === "shorts" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-0 items-start justify-start mb-2">
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
                        <h3 className="font-semibold text-20px text-[#436f4d] mb-2">
                          {item.title}
                        </h3>
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
              </div>
            )}

            {contentType === "sprachkurs" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-0 items-start justify-start mb-2">
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
                        <h3 className="font-semibold text-20px text-[#436f4d] mb-2">
                          {item.title}
                        </h3>
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
              </div>
            )}
            {contentType === "kulinarische-seele" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p
                  className="text-gray-700 italic"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
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
                                src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/recipe/${item.icon[0]}.png`}
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
                        <h3 className="font-semibold text-20px text-[#436f4d] mb-2">
                          {item.title}
                        </h3>
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
              </div>
            )}
            {/* ---------------------------------------- */}
            {(contentType !== "kulinarische-seele" ||
              contentType !== "sprachkurs") &&
              singlePostContent &&
              singlePostContent.length > 0 && (
                <div className="prose prose-lg max-w-none">
                  {singlePostContent.map((content, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="text-red-600 text-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-green-700">
                          <div
                            dangerouslySetInnerHTML={{ __html: content.title }}
                          />
                        </h2>
                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                      </p>

                      {content?.shortTitle && (
                        <div className="border border-red-500 bg-red-50 p-4">
                          <h3 className="text-red-600 font-semibold text-lg mb-1">
                            {content.shortTitle}
                          </h3>
                          <p className="text-red-600 text-sm leading-relaxed">
                            {content.title}{" "}
                            {content.shortsPostContent && (
                              <a
                                href={content.shortsPostContent}
                                className="underline hover:text-red-700"
                              >
                                Klicke hier
                              </a>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {/* Render Contact Form or regular content */}
            {hasContactForm && isContactPage ? (
              <ContactForm formHtml={content} />
            ) : null}

            {routePrefix == null &&
              contentType === "page" &&
              !hasContactForm && (
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}

            {imageFeature && contentType !== "kulinarische-seele" && (
              <div className="w-full mx-auto py-6">
                {(prevPostSlug || nextPostSlug) && (
                  <div className="flex justify-between items-center gap-4">
                    {/* Previous Button */}
                    {prevPostSlug ? (
                      <button
                        onClick={handlePrevPost}
                        className="flex items-center justify-between border border-[#436f4d] text-[#436f4d] px-4 py-2 hover:bg-green-50 transition"
                        title={prevPostTitle || "Previous post"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-[#436f4d] mr-2"
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
                        <span className="text-sm font-semibold">
                          {truncateTitle(prevPostTitle, 25)}
                        </span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {/* Next Button */}
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
                    )}
                  </div>
                )}

                <div className="border-t-2 border-[#436f4d] my-6"></div>

                {/* Collapsible Comment Component */}
                <CollapsibleComment postId={postId} />
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
