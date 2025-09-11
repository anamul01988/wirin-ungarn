import { GET_SINGLE_POST } from "../../../../graphql/queries";
import client from "../../../lib/apolloClient";
// import { GET_SINGLE_POST } from "../../../graphql/queries";

export default async function PostPage({ params }) {
  const { id } = params;
  const { data } = await client.query({
    query: GET_SINGLE_POST,
    variables: { id },
  });

  if (!data.post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{data.post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
    </div>
  );
}
