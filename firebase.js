import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAS7L2E7wwrr8ZrvlB1Bqa5HqRxWvgu2S4",
  authDomain: "g211210374proje.firebaseapp.com",
  projectId: "g211210374proje",
  storageBucket: "g211210374proje.appspot.com",
  messagingSenderId: "15351583000",
  appId: "1:15351583000:web:50253472fba97de79b4e6d",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };
