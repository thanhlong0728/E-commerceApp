import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIdXiwVYrn_fXUO6g9e3wOdyXY5dOI8HI",
  authDomain: "shopbond-cc6cb.firebaseapp.com",
  projectId: "shopbond-cc6cb",
  storageBucket: "shopbond-cc6cb.appspot.com",
  messagingSenderId: "347215009169",
  appId: "1:347215009169:web:b4ded84d09e53011c0b630"
};

// Initialize Firebase
let app;
if( firebase.apps.length === 0 ){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();
export{auth, firebase, db}