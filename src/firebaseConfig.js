import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1P3tbQrrT6Xd3sa7553c8KND9F0CTF6w",
  authDomain: "webo-assignment-f272c.firebaseapp.com",
  projectId: "webo-assignment-f272c",
  storageBucket: "webo-assignment-f272c.appspot.com",
  messagingSenderId: "25003898321",
  appId: "1:25003898321:web:bb544e5fdd91b151435cf0",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
