/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBzE-1yVa1J2W3sUCQezZcoyYPVIp2Tlr0',
  authDomain: 'team-equinox-fec.firebaseapp.com',
  projectId: 'team-equinox-fec',
  storageBucket: 'team-equinox-fec.appspot.com',
  messagingSenderId: '325833368704',
  appId: '1:325833368704:web:075898d38c797909de3265',
  measurementId: 'G-4WGBF6025R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
