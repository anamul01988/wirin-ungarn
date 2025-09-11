import { GET_ALL_POSTS } from "../../../graphql/queries";
import Link from "next/link";

export default async function PostsPage() {
  const res = await fetch("https://151.hu/ruf/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_ALL_POSTS.loc.source.body }),
    next: { revalidate: 60 }, // optional for ISR
  });
  // console.log("res 22222222222222222222", res);
  const { data } = await res.json();
  console.log("res 22222222222222222222 data", data);
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {data.posts.edges.map(({ node }) => (
          <li key={node.id}>
            <Link href={`/post/${node.id}`}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
