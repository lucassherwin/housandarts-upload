import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
// import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyAdhebuUa1UcV0V1KTOmlO2Dghc9M-8CjM",
//   authDomain: "housandarts-96836.firebaseapp.com",
//   projectId: "housandarts-96836",
//   storageBucket: "housandarts-96836.appspot.com",
//   messagingSenderId: "739415989440",
//   appId: "1:739415989440:web:23813fc45410d4c1552125",
//   measurementId: "G-FYXSW82JZS"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAdhebuUa1UcV0V1KTOmlO2Dghc9M-8CjM",
  authDomain: "housandarts-96836.firebaseapp.com",
  databaseURL: "https://housandarts-96836-default-rtdb.firebaseio.com",
  projectId: "housandarts-96836",
  storageBucket: "housandarts-96836.appspot.com",
  messagingSenderId: "739415989440",
  appId: "1:739415989440:web:6e2ca05c46087736552125",
  measurementId: "G-FDWVYPR6C7"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize storage
const storage = firebase.storage();
// Initialize firestore
const db = firebase.firestore();
// Initialize Analytics
// firebase.analytics();


export  {
  db, storage, firebase as default
};
