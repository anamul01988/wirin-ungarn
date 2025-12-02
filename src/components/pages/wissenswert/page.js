// "use client";
// import { useState, useEffect } from "react";
// import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
// import ArticleCard from "@/components/ui/ArticleCard";
// import { GetAllPosts } from "@/lib/getAllPages";
// import { useRouter } from "next/navigation";
// import { articles } from "@/lib/utils/utils";
// import { DefaultSpinner } from "@/components/_components/Spinners";

// export default function Wissenswert({ initialData }) {
//   const [onlyHeadings, setOnlyHeadings] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [apiData, setApiData] = useState({
//     apiData: { ...initialData?.apiData },
//   });
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [cursors, setCursors] = useState([null]);
//   const [isSearching, setIsSearching] = useState(false);
//   const route = useRouter();

//   // Initialize filtered posts when component mounts or apiData changes
//   useEffect(() => {
//     if (apiData?.apiData?.data?.posts?.nodes) {
//       setFilteredPosts(apiData.apiData.data.posts.nodes);
//       setTotalPosts(apiData.apiData.data.posts.nodes.length);
//     }
//   }, [apiData]);

//   // Reset to all posts when search is cleared
//   useEffect(() => {
//     if (search === "" && apiData?.apiData?.data?.posts?.nodes) {
//       setFilteredPosts(apiData.apiData.data.posts.nodes);
//     }
//   }, [search, apiData]);

//   // Handle search functionality
//   const handleSearch = async () => {
//     if (!apiData?.apiData?.data?.posts?.nodes) return;

//     const searchTerm = search.toLowerCase().trim();
//     if (!searchTerm) {
//       // If search is empty, show all posts and reset search state
//       setIsSearching(false);
//       setFilteredPosts(apiData.apiData.data.posts.nodes);
//       setTotalPosts(apiData.apiData.data.posts.nodes.length);
//       return;
//     }

//     setIsSearching(true); // Mark that we're in search mode

//     try {
//       // For a real search, we'd ideally make an API request with the search term
//       // But for client-side filtering with the data we already have:
//       const filtered = apiData.apiData.data.posts.nodes.filter((post) => {
//         const title = post.title?.toLowerCase() || "";
//         const excerpt = post.excerpt?.toLowerCase() || "";
//         const content = post.postContent?.introText?.toLowerCase() || "";

//         return (
//           title.includes(searchTerm) ||
//           excerpt.includes(searchTerm) ||
//           content.includes(searchTerm)
//         );
//       });

//       setFilteredPosts(filtered);
//       setTotalPosts(apiData.apiData.data.posts.nodes.length); // Keep total count the same
//     } catch (error) {
//       console.error("Error searching posts:", error);
//     }
//   };

//   useEffect(() => {
//     async function fetchPosts() {
//       if (isSearching) return; // Don't fetch new data while searching

//       setLoading(true);
//       const after = cursors[page];
//       const searchTerm = search.trim() || ""; // Use search term if present

//       try {
//         const data = await GetAllPosts({
//           first: 10,
//           after,
//           search: searchTerm,
//         });

//         if (data) {
//           setApiData({ apiData: data });

//           // Storing the next page's cursor if moving forward
//           const nextCursor = data?.data?.posts?.pageInfo?.endCursor;
//           if (nextCursor && cursors.length === page + 1) {
//             setCursors([...cursors, nextCursor]);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPosts();
//   }, [page, isSearching, search]);

//   const handleNext = () => {
//     setPage(page + 1);
//   };

//   const handlePrev = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   return (
//     <>
//       <div className="mb-4">
//         <button
//           onClick={() => route.push("/")}
//           className="absolute top-4 left-4 flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
//           aria-label="Back"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>
//       </div>
//       {/* Header */}
//       <div className="bg-[#CC2233] text-white py-3 px-4 mb-6">
//         <Typography variant="h5" className="font-bold text-center">
//           Wissenswert – Die Übersicht
//         </Typography>
//       </div>

//       {/* Checkbox */}
//       <div className="flex items-center justify-end mb-4">
//         <Checkbox
//           color="red"
//           checked={onlyHeadings}
//           onChange={() => setOnlyHeadings(!onlyHeadings)}
//           label="ausschließlich Überschriften anzeigen"
//           crossOrigin={undefined}
//         />
//       </div>

//       {/* Description */}
//       <Typography
//         variant="paragraph"
//         className="archive__page_description leading-relaxed font-bold mb-6"
//       >
//         Auf dieser Übersichtsseite findest du alle Artikel, die die
//         verschiedenen Auswanderer-Themen im Detail behandeln. Du kannst gerne
//         durch die Beiträge stöbern oder die Filterfunktion nutzen, um gezielt
//         nach bestimmten Inhalten zu suchen.
//       </Typography>

//       {/* Search Box */}
//       <div className="mb-6">
//         <Typography variant="small" className="font-medium mb-2">
//           Diese Seite durchsuchen
//         </Typography>
//         <div className="flex lg:flex-nowrap md:flex-wrap gap-5">
//           <div className="relative flex-1">
//             <Input
//               type="text"
//               label="Suche..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 // If search is cleared, reset to show all posts immediately
//                 if (e.target.value === "") {
//                   setIsSearching(false);
//                   if (apiData?.apiData?.data?.posts?.nodes) {
//                     setFilteredPosts(apiData.apiData.data.posts.nodes);
//                   }
//                 }
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               crossOrigin={undefined}
//             />
//             {search && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setIsSearching(false); // Exit search mode
//                   if (apiData?.apiData?.data?.posts?.nodes) {
//                     setFilteredPosts(apiData.apiData.data.posts.nodes);
//                   }
//                 }}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 aria-label="Clear search"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//           <Button color="red" onClick={handleSearch}>
//             SUCHE
//           </Button>
//         </div>
//       </div>

//       {/* Footer info */}
//       <Typography variant="small" color="gray" className="mt-4">
//         Angezeigt werden {filteredPosts.length} von {totalPosts} Beiträgen.
//       </Typography>
//       <div className="pt-6 pb-2 max-w-5xl mx-auto">
//         {!initialData ? (
//           <>
//             {" "}
//             {articles?.map((item, idx) => (
//               <div key={item.id}>
//                 <ArticleCard
//                   image={item.image}
//                   title={item.title}
//                   description={item.description}
//                 />
//                 {/* Divider except last */}
//                 {idx < articles.length - 1 && (
//                   <hr className="my-6 border-gray-300" />
//                 )}
//               </div>
//             ))}
//           </>
//         ) : (
//           <>
//             {apiData?.apiData?.data?.posts?.nodes ? (
//               <>
//                 {filteredPosts.length > 0 ? (
//                   filteredPosts.map((post) => (
//                     <div key={post.id}>
//                       <ArticleCard
//                         image={post.featuredImage?.node?.sourceUrl}
//                         title={post.title}
//                         description={post.postContent?.shortsPostContent}
//                         slug={post.slug}
//                         onlyHeadings={onlyHeadings}
//                       />
//                       {post.id < filteredPosts.length - 1 && (
//                         <hr className="my-6 border-gray-300" />
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-10">
//                     <Typography variant="h6" color="red">
//                       Keine Ergebnisse gefunden
//                     </Typography>
//                     <Typography
//                       variant="paragraph"
//                       color="gray"
//                       className="mt-2"
//                     >
//                       Bitte versuchen Sie es mit einem anderen Suchbegriff.
//                     </Typography>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 {loading ? (
//                   <div className="text-center py-10">
//                     <Typography variant="h6" color="blue">
//                       <DefaultSpinner />
//                     </Typography>
//                   </div>
//                 ) : (
//                   <div className="text-center py-10">
//                     <Typography variant="h6" color="red">
//                       Keine Beiträge verfügbar
//                     </Typography>
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {initialData && (
//         <>
//           {/* Pagination Controls */}
//           <div className="flex justify-between mt-4">
//             <Button
//               color="red"
//               disabled={page === 0 || loading || isSearching}
//               onClick={handlePrev}
//             >
//               Previous
//             </Button>
//             <Button
//               color="red"
//               disabled={
//                 loading ||
//                 isSearching ||
//                 !apiData?.apiData?.data?.posts?.pageInfo?.hasNextPage
//               }
//               onClick={handleNext}
//             >
//               Next
//             </Button>
//           </div>

//           {/* Debug info - remove in production */}
//           {process.env.NODE_ENV !== "production" && (
//             <div className="mt-2 text-xs text-gray-500">
//               <p>Page: {page}</p>
//               <p>Cursors: {JSON.stringify(cursors)}</p>
//               <p>
//                 Has Next Page:{" "}
//                 {apiData?.apiData?.data?.posts?.pageInfo?.hasNextPage
//                   ? "Yes"
//                   : "No"}
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// }
