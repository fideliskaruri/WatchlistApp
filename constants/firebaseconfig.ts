// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzvvdaVU_Yik0hvMkQJMCOr9xmssqFT-s",
    authDomain: "watchlist-5b1aa.firebaseapp.com",
    projectId: "watchlist-5b1aa",
    storageBucket: "watchlist-5b1aa.firebasestorage.app",
    messagingSenderId: "571116353159",
    appId: "1:571116353159:web:ecd3f929d6967cae086a22",
    measurementId: "G-EB1BJHPMJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);