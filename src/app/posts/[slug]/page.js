import { redirect } from "next/navigation";

export default async function PostPage({ params }) {
  const { slug } = params;
  redirect(`/${slug}`);
}
