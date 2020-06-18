import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { store } from 'store';
import { createFirestoreInstance } from 'redux-firestore';

const firebaseConfig = {
   apiKey: "AIzaSyATCY-nJvCHD3QcO9RagpZuJ5r6HEmUYwM",
   authDomain: "taskapp-42466.firebaseapp.com",
   databaseURL: "https://taskapp-42466.firebaseio.com",
   projectId: "taskapp-42466",
   storageBucket: "taskapp-42466.appspot.com",
   messagingSenderId: "606669051532",
   appId: "1:606669051532:web:19a94f1dc32b3021940da9"
};


// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 const auth = firebase.auth();


const reduxFirebase = {
   firebase,
   dispatch: store.dispatch,
   createFirestoreInstance: createFirestoreInstance,
   config: {
      userProfile: 'users',
      useFirestoreForProfile: true
   }
};

export  {fb, db, reduxFirebase, auth, firebaseConfig};