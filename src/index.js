import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBwgSea1nJXF2dr4CVgF7U9v4s8mYPOsCg",
  authDomain: "chat-app-f6ff0.firebaseapp.com",
  databaseURL: "https://chat-app-f6ff0.firebaseio.com",
  projectId: "chat-app-f6ff0",
  storageBucket: "chat-app-f6ff0.appspot.com",
  messagingSenderId: "128106480680",
  appId: "1:128106480680:web:af3f88cb6e8e04f57d211d",
  measurementId: "G-Q6VRBKS781"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
