// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIRrlLjfjr0Coy9vmhHnf_PTL1SVHp8fc",
  authDomain: "fir-socialmedia-78363.firebaseapp.com",
  projectId: "fir-socialmedia-78363",
  storageBucket: "fir-socialmedia-78363.appspot.com",
  messagingSenderId: "234419953257",
  appId: "1:234419953257:web:b2d5ebe90ce3f5d9328cf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //creates a firebase instance with the "firebaseConfig"

export const auth = getAuth(app); //tells app this app enabled firebase authentication
export const provider = new GoogleAuthProvider(); //tells firebase type of auth it uses

export const db = getFirestore(app); //tells app this app enabled firebase firestore db