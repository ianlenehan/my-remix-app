// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import {
  initializeApp as initializeAdminApp,
  applicationDefault,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

require("dotenv").config();

// Your web app's Firebase configuration
const firebaseConfig = {
  // config goes here
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: "https://remix-firebase-3622f.firebaseio.com",
  });
}

let Firebase;
if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

function getFirestore() {
  return admin.firestore();
}

function getAdminAuth() {
  return admin.auth();
}

const auth = getAuth();

async function signIn(email, password) {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

async function createUser(email, password) {
  try {
    return createUserWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
}

async function getSessionToken(idToken) {
  const auth = admin.auth();
  const decodedToken = await auth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return auth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

const db = getFirestore();

export { auth, db, signIn, createUser, getSessionToken, getAdminAuth };
