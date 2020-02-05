import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "vuegram-clone-b7eaa.firebaseapp.com",
    databaseURL: "https://vuegram-clone-b7eaa.firebaseio.com",
    projectId: "vuegram-clone-b7eaa",
    storageBucket: "vuegram-clone-b7eaa.appspot.com",
    messagingSenderId: "222630031564",
    appId: "1:222630031564:web:6aab7d9a6548d72bf31269",
    measurementId: "G-CCZCFC2G68"
}

firebase.initializeApp(firebaseConfig);