// "use client";

// import React, { useState } from "react";
// import Loader, {
//   InlineLoader,
//   FullscreenLoader,
//   OverlayLoader,
// } from "./Loader";

// /**
//  * Demo component showing all Loader variants
//  * This component is for demonstration purposes only
//  * You can view it by importing it in any page
//  */
// const LoaderDemo = () => {
//   const [showFullscreen, setShowFullscreen] = useState(false);
//   const [showOverlay, setShowOverlay] = useState(false);

//   return (
//     <div className="p-8 space-y-12">
//       <div>
//         <h1 className="text-3xl font-bold mb-8">Loader Component Demo</h1>
//         <p className="text-gray-600 mb-4">
//           All loaders use the unified loader.gif from public/assets/loader.gif
//         </p>
//       </div>

//       {/* Default Loaders */}
//       <section className="border rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">Default Loaders</h2>
//         <p className="text-gray-600 mb-4">
//           Centered in container with minimum height
//         </p>

//         <div className="space-y-6">
//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Small</h3>
//             <Loader size="small" text="Loading..." />
//           </div>

//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Medium (Default)</h3>
//             <Loader size="medium" text="Loading content..." />
//           </div>

//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Large</h3>
//             <Loader size="large" text="Loading application..." />
//           </div>

//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Without Text</h3>
//             <Loader />
//           </div>
//         </div>
//       </section>

//       {/* Inline Loaders */}
//       <section className="border rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">Inline Loaders</h2>
//         <p className="text-gray-600 mb-4">
//           For inline use (doesn't take full width)
//         </p>

//         <div className="space-y-4">
//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Small Inline</h3>
//             <div>
//               Processing your request{" "}
//               <InlineLoader size="small" text="Please wait..." />
//             </div>
//           </div>

//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">Medium Inline</h3>
//             <div className="flex items-center gap-2">
//               Status: <InlineLoader size="medium" />
//             </div>
//           </div>

//           <div className="border rounded p-4">
//             <h3 className="text-lg font-medium mb-2">In Table Cell</h3>
//             <table className="w-full border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">Name</th>
//                   <th className="p-2 border">Status</th>
//                   <th className="p-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="3" className="p-4 text-center">
//                     <InlineLoader size="small" text="Loading data..." />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* Fullscreen & Overlay Loaders */}
//       <section className="border rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">
//           Fullscreen & Overlay Loaders
//         </h2>
//         <p className="text-gray-600 mb-4">
//           Click buttons to see demos (they will cover the screen)
//         </p>

//         <div className="space-y-4">
//           <div>
//             <button
//               onClick={() => setShowFullscreen(true)}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Show Fullscreen Loader
//             </button>
//             <p className="text-sm text-gray-500 mt-2">
//               White background, covers entire screen
//             </p>
//           </div>

//           <div>
//             <button
//               onClick={() => setShowOverlay(true)}
//               className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
//             >
//               Show Overlay Loader
//             </button>
//             <p className="text-sm text-gray-500 mt-2">
//               Semi-transparent overlay with white card
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Usage Examples */}
//       <section className="border rounded-lg p-6 bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>

//         <div className="space-y-4">
//           <div>
//             <h3 className="font-medium mb-2">Default Import:</h3>
//             <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
//               {`import Loader from "@/components/_components/Loader";

// <Loader size="medium" text="Loading..." />`}
//             </pre>
//           </div>

//           <div>
//             <h3 className="font-medium mb-2">Named Imports:</h3>
//             <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
//               {`import { InlineLoader, FullscreenLoader, OverlayLoader }
//   from "@/components/_components/Loader";

// <InlineLoader size="small" text="Loading..." />
// <FullscreenLoader size="large" text="Please wait..." />
// <OverlayLoader size="medium" text="Processing..." />`}
//             </pre>
//           </div>

//           <div>
//             <h3 className="font-medium mb-2">
//               Backward Compatible (Old code still works):
//             </h3>
//             <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
//               {`import { DefaultSpinner } from "@/components/_components/Spinners";

// <DefaultSpinner />`}
//             </pre>
//           </div>
//         </div>
//       </section>

//       {/* Conditional Renders */}
//       {showFullscreen && (
//         <FullscreenLoader
//           size="large"
//           text="This is a fullscreen loader. Click anywhere to close."
//           className="cursor-pointer"
//           onClick={() => setShowFullscreen(false)}
//         />
//       )}

//       {showOverlay && (
//         <div onClick={() => setShowOverlay(false)}>
//           <OverlayLoader
//             size="medium"
//             text="This is an overlay loader. Click to close."
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoaderDemo;
