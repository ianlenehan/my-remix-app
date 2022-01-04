import { useLoaderData } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";

const parseBody = (str) => {
  return str.replace(/\n/g, "<br />");
};

export let loader = async ({ params, request }) => {
  invariant(params.slug, "expected params.slug");

  return getPost({ slug: params.slug, request });
};

export default function PostSlug() {
  let post = useLoaderData();
  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: parseBody(post.body) }} />
    </div>
  );
}
