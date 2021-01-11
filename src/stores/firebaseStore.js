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
    unsubscribe = null;

    constructor(rootStore) {

        console.log("FirebaseStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            unsubscribe: false,
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
                this.startListeners();
            } else {
                this.user = null;
                this.setSignedIn(false);
                this.stopListeners();
                this.clearData();
            }
        })

    }

    stopListeners() {
        console.log("FirebaseStore.destroy");
        if (this.unsubscribe) this.unsubscribe();
    }

    startListeners() {
        const db = firebase.firestore();
        this.unsubscribe = db
            .collection('users')
            .onSnapshot(snapshot => {
                console.log("FirebaseStore: users snapshot received");
                snapshot.forEach(doc => {
                        console.log("FirebaseStore: users snapshot:", doc.id, doc.data);
                        // this.users.push({...doc.data(), uid: doc.id})
                        this.rootStore.userStore.setUser(doc.data(), doc.id);
                    }
                );
            });
    }

    setSignedIn(signedIn) {
        this.signedIn = signedIn;
    }

    clearData() {
        this.rootStore.userStore.clearUsers();
    }

    // setFirebase = firebase => {
        // this.firebase = firebase;
    // };

    loadUsers() {

    }

}

export default FirebaseStore;
