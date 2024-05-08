'use client'
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAAlfkd10NW6d9UHWsJFo8BJChCvI1Zuhk",
    authDomain: "sls-help.firebaseapp.com",
    projectId: "sls-help",
    storageBucket: "sls-help.appspot.com",
    messagingSenderId: "849763129707",
    appId: "1:849763129707:web:2e3aaaf8c8d22ec151942e"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  export { database };
