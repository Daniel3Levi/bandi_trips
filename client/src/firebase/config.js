// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: add all keys to .env file
const firebaseConfig = {
  apiKey: 'AIzaSyAVd-FtC6Hlf595NkpCCVCZB9HU9Na-BSg',
  authDomain: 'banditrips-ba0e6.firebaseapp.com',
  projectId: 'banditrips-ba0e6',
  storageBucket: 'banditrips-ba0e6.appspot.com',
  messagingSenderId: '978781177404',
  appId: '1:978781177404:web:ec1d73c03b69d734afa539',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
