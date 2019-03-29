import firebase from "firebase";
import "firebase/firestore";

const fire = firebase.initializeApp({
  apiKey: "AIzaSyASOu8j2hREdWHGDQjL1MmD6MIqxzhwADU",
  authDomain: "janken-dt.firebaseapp.com",
  databaseURL: "https://janken-dt.firebaseio.com",
  projectId: "janken-dt",
  storageBucket: "janken-dt.appspot.com",
  messagingSenderId: "133178547325"
});

const firestore = firebase.firestore();
// const set = { timestampsInSnapshots: true }; can be put in later for firebase timestamp change
const settings = {};
firestore.settings(settings);

fire
  .firestore()
  .enablePersistence()
  .then(() => {
    // Initialize Cloud Firestore through firebase
    console.log("Persistence working!");
  })
  .catch(err => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log("Multiple tabs open. So, no offline persistence for you.");
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("Offline persistence not supported in this browser.");
    }
  });

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     console.log(user);
//     let photoURL = user.photoURL; //eslint-disable-line
//     users
//       .doc(user.uid)
//       .add({
//         onBoardingDone: false,
//         userId: user.uid,
//         displayName: user.displayName,
//         email: user.email,
//         photoURL
//       })
//       .then(() => {
//         users
//           .doc(user.uid)
//           .get()
//           .then(querySnapshot => {
//             console.log(querySnapshot.data());
//           });
//       });
//   }
// });

const db = fire.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const users = db.collection("users");

export { db, auth, provider, fbProvider, users };
