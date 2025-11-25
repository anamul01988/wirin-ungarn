"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  // Button,
  Typography,
} from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import CollapsibleComment from "./CollapsibleComment";
import ContactForm from "./ContactForm";
import ModalIcons from "./ModalIcons";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import "plyr-react/plyr.css";
import EinfachLesenAccordion from "./EinfachLesenAccordion";
import TimetellingGame from "../pages/timetellingGame/TimetellingGame";
import SuffixHeroGrammarExplanations from "./SuffixHeroStatic";
import KategorianCollapsibleComment from "./kategorian_collapsibleForm";
import Link from "next/link";
import LearningBoxModal from "./LearningBoxModal";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";
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
  routeName,
  postContent, // Add postContent prop
  postId,
  nextPostSlug, // Add nextPostSlug prop
  prevPostSlug, // Add prevPostSlug prop
  nextPostTitle, // Add nextPostTitle prop
  prevPostTitle, // Add prevPostTitle prop
  // backupShortsPostContent,
  isSinglePage = false,
}) {
  const [open, setOpen] = useState(true);
  const [learningBoxOpen, setLearningBoxOpen] = useState(false);

  const route = useRouter();
  const pathname = usePathname();
  const handleOpen = () => setOpen(!open);
  const navigateToHome = () => {
    route.push("/");
  };

  // Get current URL for learning box source field
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
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
  // console.log("contentsssssssssssss", isSinglePage, contentType);

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

  // Lazy loaded featured image component with placeholder
  const LazyFeaturedImage = ({ imageUrl, imageAlt }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!imageUrl) return null;

    return (
      <div className="mb-3 h-56 md:h-68 rounded-[28px] overflow-hidden relative max-w-xl mx-auto">
        {/* Loading placeholder/skeleton */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-full h-full bg-gray-200 rounded-[28px]" />
          </div>
        )}

        {/* Error placeholder */}
        {error && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-[28px]">
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        )}

        {/* Actual image */}
        <Image
          src={imageUrl}
          alt={imageAlt || "Featured image"}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(false);
          }}
          className={`
            object-cover rounded-[28px]
            ${loaded && !error ? "opacity-100" : "opacity-0"}
            transition-opacity duration-300
          `}
        />
      </div>
    );
  };

  // Check if content contains a contact form
  const hasContactForm =
    typeof content === "string" && content?.includes("wpcf7-form");
  const isContactPage = title && title.toLowerCase().includes("kontakt");
  console.log("isContactPage", isContactPage, routePrefix);

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
            isSinglePage={isSinglePage}
            showFavorite={contentType === "page" || !contentType ? false : true}
            showLayers={contentType !== "page" || !contentType ? false : true}
            onFavorite={() => console.log("Favorite clicked")}
            onLayers={() => console.log("Layers clicked")}
            onShare={() => console.log("Share clicked")}
            onLearningBox={() => setLearningBoxOpen(true)}
            showLearningBox={routePrefix === "einfach-lesen"}
          />
        )}

        {/* Learning Box Modal */}
        <LearningBoxModal
          open={learningBoxOpen}
          onClose={() => setLearningBoxOpen(false)}
          sourceUrl={getCurrentUrl()}
          title={title}
        />

        {/* Dialog Body */}
        <DialogBody className="overflow-auto custom__modal_area flex-1 mr-1 p-[30px]">
          <div className="single__page-content">
            {/* Breadcrumb */}
            {title &&
              !title.toLowerCase().includes("kontakt") &&
              pathname !== "/wie-spaet-ist-es/" &&
              routePrefix !== "philosophie" && (
                <div className="mb-2 px-0 pt-0">
                  <Breadcrumb className="text-sm" isSinglePage={isSinglePage} />
                </div>
              )}

            {pathname === "/wie-spaet-ist-es/" && (
              <div className="w-full relative flex items-center justify-center mb-3">
                <ArchivePageHeaderImage
                  imageUrl="/headlineImages/wie-spaet-ist-es.jpg"
                  imageAlt="wie-spaet-ist-es"
                />
              </div>
            )}

            {title && title.toLowerCase().includes("kontakt") && (
              <div className="w-full relative flex items-center justify-center mb-3">
                <ArchivePageHeaderImage
                  imageUrl="/headlineImages/Kontakt.jpg"
                  imageAlt="kontakt"
                />
              </div>
            )}
            {routePrefix === "philosophie" && (
              <div className="w-full relative flex items-center justify-center mb-3">
                <ArchivePageHeaderImage
                  imageUrl="/headlineImages/Philosophie.jpg"
                  imageAlt="philosophie"
                />
              </div>
            )}
            {routePrefix !== "einfach-lesen" && !isContactPage && (
              <h1 className="single__page_title text-[#436f4d]">{title}</h1>
            )}
            {contentType === "wissenswert" && (
              <div className="mb-6 py-4 rounded-lg">
                <p
                  className="single__page_description"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
              </div>
            )}
            {contentType === "aus-dem-leben" && (
              <div className="mb-6 p-0 mt-4">
                <div
                  className="text-sm leading-relaxed text-left mb-2"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}

            {!contentType === "page" && (
              <>
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
              </>
            )}

            {/* Excerpt */}
            {excerpt && (
              <div className="mb-6 p-4">
                <p className="text-gray-700">{excerpt}</p>
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

            {imageFeature &&
              routePrefix !== "sprachkurs" &&
              routePrefix !== "einfach-lesen" && (
                <LazyFeaturedImage
                  imageUrl={imageFeature}
                  imageAlt={imageAlt || title}
                />
              )}
            {/* {imageFeature &&
              routePrefix !== "sprachkurs" &&
              routePrefix !== "einfach-lesen" && (
                <div
                  className="mb-3 h-56 md:h-68 rounded-[28px] overflow-hidden relative max-w-xl mx-auto"
                  style={{
                    backgroundImage: `url('${imageFeature}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  role="img"
                ></div>
              )} */}

            {contentType === "einfach-lesen" && (
              <div className="mb-6">
                {/* Learning Tip Section */}
                <section className="border-2 border-[#cc2233] mb-6">
                  <div
                    className="cursor-pointer relative"
                    onClick={(e) => {
                      const contentWrapper = e.currentTarget.nextElementSibling;
                      const h3 = e.currentTarget.querySelector("h3");
                      contentWrapper.classList.toggle("hidden");
                      h3.classList.toggle("active");
                    }}
                  >
                    <h3 className="text-lg p-3 text-[#cc2233] relative pr-10">
                      Lerntipp: Wie Du diese Texte optimal zum Sprachenlernen
                      nutzt
                      <span className="absolute right-3 top-3 text-xl transition-transform plus-icon">
                        +
                      </span>
                    </h3>
                  </div>
                  <div className="hidden p-3">
                    <div className="content">
                      <p className="text-[#cc2233]">
                        Diese Texte sind ideal zum parallelen Lesen und Hören
                        geeignet. Mit{" "}
                        <a
                          href="https://wir-in-ungarn.hu/linguist-webseiten-ubersetzer/"
                          className="underline"
                        >
                          Browser-Erweiterungen wie "Linguist"
                        </a>{" "}
                        oder ähnlichen Übersetzungstools kannst du beim Zuhören
                        unbekannte Wörter oder Textpassagen schnell und bequem
                        übersetzen - einfach durch Markieren oder Anklicken des
                        gewünschten Wortes bzw. der Textpassage. So verbesserst
                        du gleichzeitig dein Hörverständnis und erweiterst
                        deinen Wortschatz. Die verschiedenen
                        Schwierigkeitsstufen (A1, A2, B1) ermöglichen es dir,
                        schrittweise deine Sprachkenntnisse zu vertiefen. Höre
                        die Texte mehrmals und sprich ruhig laut mit - das
                        fördert zusätzlich deine Aussprache.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Lesson Card - FULL WIDTH */}
                <div className="w-full border border-gray-300 rounded-lg bg-white shadow-md overflow-hidden p-4">
                  {/* Featured Image and Content */}
                  <div className="flex flex-wrap">
                    {imageFeature && (
                      <div className="w-full md:w-1/4 md:float-left md:mr-4 mb-4 md:mb-0">
                        <img
                          src={imageFeature}
                          alt={imageAlt || title}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}

                    <div className="w-full md:w-[calc(75%-16px)] md:float-left">
                      <h1 className="single__page_postTitle font-semibold mb-2">
                        {title}
                      </h1>
                      {customFields?.germanTitle && (
                        <h2 className="text-lg text-gray-600">
                          {customFields.germanTitle}
                        </h2>
                      )}
                    </div>
                  </div>

                  {/* Clear floats */}
                  <div className="clear-both"></div>

                  {/* Level Contents Accordion */}
                  {customFields?.levelContents &&
                    customFields.levelContents.length > 0 && (
                      <div className="w-full mt-5">
                        {customFields.levelContents.map((level, index) => (
                          <EinfachLesenAccordion
                            key={index}
                            level={level}
                            isFirst={index === 0}
                          />
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )}

            {contentType === "wissenswert" && (
              <div className="mb-6 py-0 mt-4">
                {/* <p
                  className="single__page_description"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                /> */}
                {content?.postContent?.length > 0 ? (
                  <>
                    {" "}
                    {content?.postContent?.map((item, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex pt-0 items-start justify-start mb-2">
                          <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
                            <div
                              className="w-full h-full cursor-pointer"
                              // style={{
                              //   background:
                              //     "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                              // }}
                            >
                              <div>
                                {item.icon && item.icon.length > 0 ? (
                                  <Image
                                    src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/${item.icon[0]}.png`}
                                    alt={item.icon[0]}
                                    width={50}
                                    height={50}
                                    loading="lazy"
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
                            <h3 className="font-semibold single__page_postTitle text-[#436f4d] mb-2">
                              {item.title}
                            </h3>
                            {/* Content */}
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="single__page_description leading-relaxed text-left mb-2"
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {" "}
                    {content?.shortsPostContent && (
                      <div className="mb-6 py-4">
                        <p
                          className="single__page_description"
                          dangerouslySetInnerHTML={{
                            __html: content?.shortsPostContent,
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {contentType === "shorts" && (
              <div className="mb-6 p-0 mt-4">
                <p
                  className="text-sm leading-relaxed text-left mb-2"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-0 items-start justify-start mb-2">
                      <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
                        <div
                          className="w-full h-full cursor-pointer"
                          // style={{
                          //   background:
                          //     "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                          // }}
                        >
                          <div>
                            {item.icon && item.icon.length > 0 ? (
                              <Image
                                src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/${item.icon[0]}.png`}
                                alt={item.icon[0]}
                                loading="lazy"
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
              <div className="mb-6 p-0 mt-4">
                <p
                  className="text-sm leading-relaxed text-left mb-2"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-0 items-start justify-start mb-2">
                      <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
                        <div
                          className="w-full h-full cursor-pointer"
                          // style={{
                          //   background:
                          //     "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                          // }}
                        >
                          <div>
                            {item.icon && item.icon.length > 0 ? (
                              <Image
                                src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/${item.icon[0]}.png`}
                                alt={item.icon[0]}
                                loading="lazy"
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
              <div className="mb-6 p-0 mt-4">
                <p
                  className="text-sm leading-relaxed text-left mb-2"
                  dangerouslySetInnerHTML={{ __html: content?.introText }}
                />
                {content?.postContent?.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex pt-10 items-start justify-start mb-2">
                      <div className="flex-shrink-0 basis-[70px] h-[70px] w-[70px] flex items-start mr-3">
                        <div
                          className="w-full h-full cursor-pointer"
                          // style={{
                          //   background:
                          //     "radial-gradient(rgb(0 0 0 / 0.1), transparent)",
                          // }}
                        >
                          <div>
                            {item.icon && item.icon.length > 0 ? (
                              <Image
                                src={`https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/recipe/${item.icon[0]}.png`}
                                alt={item.icon[0]}
                                loading="lazy"
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
            {contentType === "kurz-und-knapp" && (
              <div>
                <p
                  className="text-sm leading-relaxed text-left mb-2"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className=" flex flex-col float-end justify-end gap-5">
                  <button
                    onClick={() => route.push("/kurz-und-knapp/")}
                    className="bg-[#436f4d] hover:bg-[#5a7a5e] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                  >
                    zur Fragen-Übersicht
                  </button>
                  <button className="bg-[#c03] hover:bg-[#a02828] text-white text-sm font-medium px-2 py-2 rounded transition-colors">
                    Fehler gefunden?
                  </button>
                </div>
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

            {pathname === "/wie-spaet-ist-es/" &&
            routePrefix == null &&
            contentType === "page" ? (
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      content.length > 203
                        ? content.slice(0, 200) + "..."
                        : content,
                  }}
                />
                <TimetellingGame />
              </div>
            ) : (
              <>
                {" "}
                {routePrefix == null &&
                  contentType === "page" &&
                  !hasContactForm && (
                    <div
                      className={`prose prose-p-strong prose-p max-w-none ${
                        pathname === "/uber-uns" ||
                        pathname === "/uber-uns/" ||
                        pathname === "/wiu-muenzen" ||
                        pathname === "/wiu-muenzen/" ||
                        pathname === "/philosophie" ||
                        pathname === "/philosophie/" ||
                        pathname === "/karriere" ||
                        pathname === "/karriere/"
                          ? "ueber-uns-prose"
                          : ""
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  )}
              </>
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
                {contentType !== "kategorien" && (
                  <>
                    {" "}
                    <div className="border-t-2 border-[#436f4d] my-6"></div>
                    {/* Collapsible Comment Component */}
                    <CollapsibleComment postId={postId} />
                  </>
                )}
              </div>
            )}
            {/* --------------------------------------------------------------------------------------- */}
            {customFields &&
              contentType === "kategorien" &&
              customFields.topicsPostContent && (
                <div className="mb-6">
                  {/* <h3 className="font-semibold text-green-800 mb-4 text-xl">
                    {customFields.shortTitle || "Kategorien"}
                  </h3> */}
                  <div className="space-y-8 kategorian__singlePost">
                    {customFields.topicsPostContent.map((section, index) => (
                      <div key={index} className="">
                        {section.title && (
                          <h2 className="mb-2">{section.title}</h2>
                        )}
                        {section.content && (
                          <div
                            className=""
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          />
                        )}
                        {/* --------------------- */}
                        {section.linkTitle && section.linkSubtitle && (
                          <Link href="https://wir-in-ungarn.hu/50-languages/">
                            <div class="custom-button">
                              <div class="cb_img">
                                <img
                                  src="https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/blog-icon.png"
                                  alt="blog icon right"
                                />
                              </div>
                              <div class="cb_titles">
                                <div class="main-text-btn">
                                  {section.linkTitle}
                                </div>
                                <div class="sub-text-btn">
                                  {section.linkSubtitle}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="border-t-2 border-[#436f4d] my-6"></div>

                    {/* Collapsible Comment Component */}
                    <KategorianCollapsibleComment postId={112} />
                  </div>
                </div>
              )}
            {routeName === "/suffixhero/" && <SuffixHeroGrammarExplanations />}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
