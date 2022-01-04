import { redirect } from "remix";
import invariant from "tiny-invariant";

import { db } from "~/utils/db.server";
import { getUserSession } from "~/utils/session.server";

function isValidPostAttributes(attributes) {
  return attributes?.title;
}

export async function getPosts(request) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const querySnapshot = await db.collection("posts").get();

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
}

export async function getPost({ request, slug }) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const docSnapshot = await db.collection("posts").doc(slug).get();
  if (!docSnapshot.exists) {
    throw Error("No Such Document");
  } else {
    const post = docSnapshot.data();
    invariant(
      isValidPostAttributes(post),
      `Post ${slug} is missing the title attribute`
    );
    return post;
  }
}

export async function createPost({ slug, body, title, request }) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  invariant(
    isValidPostAttributes({ title }),
    `Post ${slug} is missing the title attribute`
  );

  const docRef = db.collection("posts").doc(slug);
  await docRef.set({ slug, body, title });
  return getPost({ request, slug });
}
