import firebase from 'firebase';
import 'firebase/firestore';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyASOu8j2hREdWHGDQjL1MmD6MIqxzhwADU",
    authDomain: "janken-dt.firebaseapp.com",
    databaseURL: "https://janken-dt.firebaseio.com",
    projectId: "janken-dt",
    storageBucket: "janken-dt.appspot.com",
    messagingSenderId: "133178547325",
    appId: "1:133178547325:web:24e8d6edca996997"
});

const firestore = firebase.firestore();
// const set = { timestampsInSnapshots: true }; can be put in later for firebase timestamp change
const settings = {};
firestore.settings(settings);

fire.firestore().enablePersistence()
    .then(() => {
        // Initialize Cloud Firestore through firebase
        console.log('Persistence working!');
    })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
            console.log('Multiple tabs open. So, no offline persistence for you.');
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log('Offline persistence not supported in this browser.');
        }
    });

const db = fire.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const googleSignIn = () => auth.signInWithPopup(provider);
const users = db.collection('users');
// let user = false;

const signIn = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            // In memory persistence will be applied to the signed in Google user
            // even though the persistence was set to 'none' and a page redirect
            // occurred.
            return firebase.auth().signInWithRedirect(provider);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

const createNewDbUser = () => {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // user = true;
            users.doc(user.uid).set({
                user
            });
        }
    });
};

export {
    db,
    auth,
    provider,
    googleSignIn,
    signIn,
    users,
    createNewDbUser
};