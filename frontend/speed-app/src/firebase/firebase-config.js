// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC33p7tsyQbAaRMaffv-WTclsYj58OVqT8",
  authDomain: "speedapp-fc0e3.firebaseapp.com",
  projectId: "speedapp-fc0e3",
  storageBucket: "speedapp-fc0e3.appspot.com",
  messagingSenderId: "393549758815",
  appId: "1:393549758815:web:49ed1938a3561cfa8cb6ea",
  measurementId: "G-TGSTB38PNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Exports
export {
    db
}