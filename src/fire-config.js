import firebase from 'firebase';

export const fire = firebase.initializeApp({
  apiKey: 'AIzaSyB2YX-tROYclvmJFiLMX8c7z3m8ickPSR8',
  authDomain: 'fire-messinger.firebaseapp.com',
  projectId: 'fire-messinger',
  storageBucket: 'fire-messinger.appspot.com',
  messagingSenderId: '388130349308',
  appId: '1:388130349308:web:11215ea79a189b80c03779',
});

export default firebase;
export const auth = firebase.auth();
export const database = firebase.firestore();
