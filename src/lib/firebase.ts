// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGAVm_ewiQjB-s-Q7K9jRwxngaqcUoek4",
    authDomain: "kyc-olive.firebaseapp.com",
    projectId: "kyc-olive",
    storageBucket: "kyc-olive.firebasestorage.app",
    messagingSenderId: "115898027432",
    appId: "1:115898027432:web:fe036bfaf80eefa20fe19d",
    measurementId: "G-RLTHGGPEHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export { auth }; // Export the initialized auth instance
