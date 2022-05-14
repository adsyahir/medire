// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAopH2RV9VOerKLrO5BS8IyR9Rw-tv7l4",
  authDomain: "medire-a2d27.firebaseapp.com",
  projectId: "medire-a2d27",
  storageBucket: "medire-a2d27.appspot.com",
  messagingSenderId: "1096805829232",
  appId: "1:1096805829232:web:1cb1858e3344dd0cefc2b5"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0)
{
    app = firebase.initializeApp(firebaseConfig);
}
else
{
    app = firebase.app()
}

const auth = firebase.auth()

export {auth};