import firebase from 'firebase/app'
import 'firebase/firestore'

// La configuración de Firebase de su aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyABo9X68e44I5KSgjAevTySHn-9nHZKgNQ",
  authDomain: "crud-udemy-react-f3c62.firebaseapp.com",
  projectId: "crud-udemy-react-f3c62",
  storageBucket: "crud-udemy-react-f3c62.appspot.com",
  messagingSenderId: "911932688765",
  appId: "1:911932688765:web:d56f4b90cb0cccc8b26414"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}