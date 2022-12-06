// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import firebase from 'firebase'
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiDUb4zwZuTGPnctT2zKsRcxo9N9pmfCU",
  authDomain: "clocking-6e6b6.firebaseapp.com",
  projectId: "clocking-6e6b6",
  storageBucket: "clocking-6e6b6.appspot.com",
  messagingSenderId: "754628951474",
  appId: "1:754628951474:web:1fc09bfdeb598081a638ab",
  measurementId: "G-VHSL53LY72"
};

// Initialize Firebase
// let app;

// if (firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig)
// }else{
//   app = firebase.app()
// }


const app = initializeApp(firebaseConfig);  
//const analytics = getAnalytics(app);

// const firestore = firebase.firestore()
// const auth = firebase.auth()
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
export {db,auth,storage}