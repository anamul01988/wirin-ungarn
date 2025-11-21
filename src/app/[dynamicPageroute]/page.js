import DynamicPageClient from "@/components/ui/DynamicPageClient";

export default async function DynamicPage({ params }) {
  const { dynamicPageroute } = await params;

  // We now use the client component that handles the conditional API calls
  return <DynamicPageClient slug={dynamicPageroute} />;
}
