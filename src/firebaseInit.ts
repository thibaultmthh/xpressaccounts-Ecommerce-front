import firebase from "firebase/app";
// eslint-disable-next-line import/no-duplicates
import "firebase/auth";
// eslint-disable-next-line import/no-duplicates
import "firebase/firestore";

// eslint-disable-next-line import/no-duplicates
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBXAK7dmzPu-0eVthEbjq4TYhvkYLbKSro",
  authDomain: "xpressaccounts-1fa5c.firebaseapp.com",
  projectId: "xpressaccounts-1fa5c",
  storageBucket: "xpressaccounts-1fa5c.appspot.com",
  messagingSenderId: "745405786560",
  appId: "1:745405786560:web:318375c1382a28c6588025",
  measurementId: "G-9F3PYWX8XS",
};
// Initialize Firebase
export default function initFirebase() {
  if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
  return firebase;
}
