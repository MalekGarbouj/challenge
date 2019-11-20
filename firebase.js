import * as firebase from "firebase";

const config = {apiKey: "AIzaSyDag3xVKOxvHKhclHIxvzUgpFJNTUMB0YQ",
authDomain: "challenge-cfe8d.firebaseapp.com",
databaseURL: "https://challenge-cfe8d.firebaseio.com",
projectId: "challenge-cfe8d",
storageBucket: "challenge-cfe8d.appspot.com",
messagingSenderId: "930560309860",
appId: "1:930560309860:web:1344e8c9a5b747a1447d71",
measurementId: "G-PB1FQB0DV4"};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()