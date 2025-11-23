"use client";
import React, { useEffect, useState } from "react";
import { GetKategorienPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
import Image from "next/image";
const KategorienPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]); // Store all kategorien posts
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Get current posts to display based on pagination
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return allPosts.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    return Math.ceil(allPosts.length / postsPerPage);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetKategorienPages();
        // console.log("shorts data:", apiData.data.posts);
        // console.log("shorts data: alll 222222", apiData);
        setCookieData(apiData);
        // Store all posts in state
        setAllPosts(apiData.data.posts.edges || []);
        setCurrentPage(1);
      } catch (err) {
        setError("Fehler beim Laden der Cookie-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  // if (!cookieData || !cookieData.data || !cookieData.data.page)
  //   return <div>Keine Cookie-Daten gefunden.</div>;
  const { title, content } = cookieData.data.pages?.nodes[0] || {};

  // Get posts to display
  const displayPosts = getCurrentPosts();
  const totalPages = getTotalPages();
  const activePage = currentPage;
  const totalPosts = allPosts.length;

  console.log("kategorien data: allPosts:", allPosts);

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="w-full relative flex items-center justify-center mt-0 mb-5">
        <Image
          src="/kategorian.jpeg"
          alt={title || "Kategorien"}
          width={500}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Checkbox */}
      {/* <div className="flex items-center justify-end mb-4">
        <Checkbox
          color="red"
          checked={onlyHeadings}
          onChange={(e) => setOnlyHeadings(e.target.checked)}
          label="ausschließlich Überschriften anzeigen"
          crossOrigin={undefined} // needed for React strict mode
        />
      </div> */}

      {/* Description */}
      <Typography
        variant="paragraph"
        className="archive__page_description leading-relaxed font-bold mb-6"
      >
        Wir haben die meisten unserer detaillierten Texte, von der Seite
        "Wissenswert", zu verschiedenen übergreifenden Themen zusammengefasst.
        Alle diese Übersichten findest Du hier. Diese "Themen" verlinken dann
        auf alle einzelnen Posts, die im Detail alles Hintergrund-Wissen
        vermitteln, was Du als Ungarn-Auswanderer benötigst.
      </Typography>

      {/* Footer info */}
      {/* <Typography variant="small" color="gray" className="mt-4">
        Seite {activePage} von {totalPages} - Insgesamt {totalPosts} Beiträge -
        Angezeigt werden {displayPosts?.length || 0} Beiträge.
      </Typography> */}
      <div className="pt-6 pb-2 max-w-5xl mx-auto">
        <>
          {displayPosts?.map((edge, idx) => {
            return (
              <div key={edge.node.id}>
                <CustomPost
                  title={edge.node?.title}
                  image={edge.node?.featuredImage?.node?.sourceUrl}
                  imageAlt={edge.node?.featuredImage?.node?.altText}
                  description={edge.node.postContent?.topicsPostContent}
                  excerpt={null}
                  onlyHeadings={onlyHeadings}
                  slug={edge.node.slug}
                  routePrefix="kategorien"
                />
                {/* Divider except last */}
                {!onlyHeadings && idx < displayPosts?.length - 1 && (
                  <hr className="my-6 border-gray-300" />
                )}
              </div>
            );
          })}

          {/* Numbered Pagination - Only show if more than 1 page */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
                className="pagination-number"
              >
                &laquo;
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= activePage - 2 && pageNum <= activePage + 2);

                  const showEllipsis =
                    (pageNum === activePage - 3 && activePage > 4) ||
                    (pageNum === activePage + 3 && activePage < totalPages - 3);

                  if (showEllipsis) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`pagination-number ${
                        pageNum === activePage ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
                className="pagination-number"
              >
                &raquo;
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default KategorienPage;
