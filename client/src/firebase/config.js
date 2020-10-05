import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCjpOk4Z-6tRUe6RkecWQ_UNG5Qv2sh958',
  authDomain: 'legacy-project-babe.firebaseapp.com',
  databaseURL: 'https://legacy-project-babe.firebaseio.com/',
  storageBucket: 'legacy-project-babe.appspot.com',
};

firebase.initializeApp(config);

export default firebase;
