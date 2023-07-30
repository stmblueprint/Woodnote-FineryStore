// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import 'firebase/firestore';

import { useEffect, useState } from "react";
// https://firebase.google.com/docs/web/setup#available-libraries




const firebaseConfig = {
    apiKey: "AIzaSyDJgQmMCW-69RKJgD0JWR0hBK_zH8prxAs",
    authDomain: "woodnote-finery-d8cdd.firebaseapp.com",
    projectId: "woodnote-finery-d8cdd",
    storageBucket: "woodnote-finery-d8cdd.appspot.com",
    messagingSenderId: "512478761585",
    appId: "1:512478761585:web:74be33e0c6919a261ec1d0",
    measurementId: "G-6MTZ1Z42S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth =  getAuth(app);


export {db , auth, app};