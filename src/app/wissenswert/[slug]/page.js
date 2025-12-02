// note: not needed now  everything was ok --------------------------------------------------- i commented to delete later

// import { notFound } from "next/navigation";
// import { GetWissenswertPostBySlug } from "@/lib/getAllPages";
// import DialogContent from "@/components/_components/DialogContent";
// export default async function WissenswertDynamicPage({ params }) {
//   const { slug } = await params;

//   try {
//     const contentData = await GetWissenswertPostBySlug(slug);
//     if (contentData.type === "post") {
//       const { title, content, featuredImage, postContent, imageLong } =
//         contentData.data.data.post;
//       const imageUrl = imageLong?.featuredImageMobile?.node?.sourceUrl || null;

//       return (
//         <div className="min-h-screen flex items-center justify-center">
//           <DialogContent
//             title={title}
//             content={postContent || content || "<p>No content available.</p>"}
//             imageFeature={imageUrl}
//             contentType="wissenswert"
//             routePrefix="wissenswert"
//             isSinglePage={true}
//           />
//         </div>
//       );
//     }

//     // Handle page content
//     if (contentData.type === "page") {
//       const { title, content } = contentData.data.page;

//       return (
//         <div className="min-h-screen flex items-center justify-center">
//           <DialogContent
//             title={title}
//             content={content}
//             // routeName={slug}
//           />
//         </div>
//       );
//     }
//     notFound();
//   } catch (error) {
//     console.error("Error fetching content:", error);
//     notFound();
//   }
// }
