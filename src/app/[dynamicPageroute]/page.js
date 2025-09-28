import DynamicPageClient from "@/components/ui/DynamicPageClient";

export default function DynamicPage({ params }) {
  const { dynamicPageroute } = params;
  
  // We now use the client component that handles the conditional API calls
  return <DynamicPageClient slug={dynamicPageroute} />;
}
