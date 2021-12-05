import path from "path";
import invariant from "tiny-invariant";
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "~/utils/db.server";

function isValidPostAttributes(attributes) {
  return attributes?.title;
}

export async function getPosts() {
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
}

export async function getPost(slug) {
  const docRef = doc(db, "posts", slug);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
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

export async function createPost({ slug, body, title }) {
  invariant(
    isValidPostAttributes({ title }),
    `Post ${slug} is missing the title attribute`
  );
  const docRef = doc(db, "posts", slug);
  await setDoc(docRef, { slug, body, title });
  return getPost(slug);
}
