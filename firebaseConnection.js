// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWFl8ycuSQq2G4p2FxVSyZ3F1YcuKD7ds",
    authDomain: "meusistema-1120d.firebaseapp.com",
    projectId: "meusistema-1120d",
    storageBucket: "meusistema-1120d.appspot.com",
    messagingSenderId: "492373714734",
    appId: "1:492373714734:web:0f5f50d7f725d95841fcbf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bancoExterno=getFirestore(app);
export {bancoExterno};