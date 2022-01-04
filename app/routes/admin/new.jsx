import { useActionData, redirect, Form, useTransition } from "remix";
import { createPost } from "~/post";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let title = formData.get("title");
  let slug = formData.get("slug");
  let body = formData.get("body");

  let errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!body) errors.body = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createPost({ title, slug, body, request });

  return redirect("/admin");
};

export default function NewPost() {
  let errors = useActionData();
  let transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="body">Body</label>{" "}
        {errors?.body && <em>Body is required</em>}
        <br />
        <textarea rows={20} name="body" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
