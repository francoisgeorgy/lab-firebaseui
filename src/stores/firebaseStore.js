import {makeAutoObservable, action} from 'mobx';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// Instantiate a Firebase app.
// firebase.initializeApp(firebaseConfig);

class FirebaseStore {

    rootStore = null;
    // firebase = null;

    signedIn = false;
    user = null;

    constructor(rootStore) {

        console.log("FirebaseStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            setSignedIn: action
        });
        this.rootStore = rootStore;

        // Instantiate a Firebase app.
        console.log("FirebaseStore.constructor: firebase.initializeApp");
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(user => {

            console.log("firebase onAuthStateChanged", user !== null);

            if (user) {
                this.user = user;
                this.setSignedIn(true);
            } else {
                this.user = null;
                this.setSignedIn(false);
            }
        })

    }

    setSignedIn(signedIn) {
        this.signedIn = signedIn;
    }

    // setFirebase = firebase => {
        // this.firebase = firebase;
    // };

}

export default FirebaseStore;
