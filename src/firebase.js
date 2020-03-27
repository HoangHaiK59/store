import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyASW6XSwQWw-hw9XCOHKfjAVu935R1w2R0",
    authDomain: "store-80edf.firebaseapp.com",
    DatabaseURL: "https://store-80edf.firebaseio.com",
    projectId: "store-80edf",
    storageBucket: "store-80edf.appspot.com",
    messagingSenderId: "425192007818",
    AppID: "1: 425192007818: web: 04661548e39d52bffaa573",
    measurementId: "G-M5VTJ2M055"
}; 

firebase.initializeApp(firebaseConfig);

export default firebase;