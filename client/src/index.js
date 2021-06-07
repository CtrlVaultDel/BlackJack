import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
// =========================== IMPORTS END ===========================


const firebaseConfig = { apiKey: process.env.REACT_APP_API_KEY };
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);