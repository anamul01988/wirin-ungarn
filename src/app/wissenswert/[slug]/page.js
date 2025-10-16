import { redirect } from "next/navigation";

export default async function WissenswertDynamicPage({ params }) {
  const { slug } = params;
  
  // Redirect to the root slug URL
  redirect(`/${slug}`);
}
