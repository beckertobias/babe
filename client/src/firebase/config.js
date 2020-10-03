import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCjpOk4Z-6tRUe6RkecWQ_UNG5Qv2sh958',
  authDomain: 'legacy-project-babe.firebaseapp.com',
  databaseURL: 'https://legacy-project-babe.firebaseio.com/',
  storageBucket: 'legacy-project-babe.appspot.com',
};

firebase.initializeApp(config);

export const auth = firebase.auth;

/*
//AUTH
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase/config';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
*/
