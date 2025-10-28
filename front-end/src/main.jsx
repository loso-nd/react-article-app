import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHldHw1N-LJwOUdIF0UJKnIhnyVFZJm4w",
  authDomain: "react-article-app-cc11a.firebaseapp.com",
  projectId: "react-article-app-cc11a",
  storageBucket: "react-article-app-cc11a.firebasestorage.app",
  messagingSenderId: "292623382983",
  appId: "1:292623382983:web:c2a10f7ae730eaeb5701e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Entry page of the app his is the first file that will get 
// executed when our React app is rendered in a browser