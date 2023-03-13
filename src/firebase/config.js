import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQut5-rmeAjh0asiAcpUC-daI1bauBoLE",
  authDomain: "thedojosite-49b9f.firebaseapp.com",
  projectId: "thedojosite-49b9f",
  storageBucket: "thedojosite-49b9f.appspot.com",
  messagingSenderId: "541445723537",
  appId: "1:541445723537:web:708ed3d47d6b03e8ad3630",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
