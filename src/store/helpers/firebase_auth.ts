import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signInWithCustomToken, signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwBCwSeZ6ruPYaKO85IPLwZ-cfrZ3hxkI',
  authDomain: 'job-board-a3cdd.firebaseapp.com',
  databaseURL: 'https://job-board-a3cdd-default-rtdb.firebaseio.com',
  projectId: 'job-board-a3cdd',
  storageBucket: 'job-board-a3cdd.appspot.com',
  messagingSenderId: '211163864133',
  appId: '1:211163864133:web:f888aada7cb4a3b17f972c',
  measurementId: 'G-REFYPVVEZR',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// initialize firebase auth
const auth = getAuth();

export {
  auth, signInWithEmailAndPassword, signInWithCustomToken, signOut,
};
