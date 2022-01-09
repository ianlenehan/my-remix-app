import { redirect } from "remix";

import { db } from "~/utils/db.server";
import { getUserSession } from "./utils/session.server";

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
    throw Error("No such document exists");
  } else {
    const post = docSnapshot.data();
    return post;
  }
}

export async function createPost({ request, post }) {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  const { title, body, slug } = post;

  const docRef = db.collection("posts").doc(slug);
  await docRef.set({ slug, body, title });

  return getPost({ request, slug });
}
