import {makeAutoObservable, action} from 'mobx';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

/**
 * Instantiate the Firebase app.
 * Manage all interactions with Firebase.
 * Populate dataStore, sessionStore and userStore.
 */
class FirebaseStore {

    rootStore = null;
    // firebase = null;

    signedIn = false;
    user = null;
    unsubscribeUsers = null;
    unsubscribePresets = null;

    constructor(rootStore) {

        console.log("FirebaseStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            unsubscribeUsers: false,
            unsubscribePresets: false,
            setSignedIn: action
        });
        this.rootStore = rootStore;

        // Instantiate a Firebase app.
        console.log("FirebaseStore.constructor: firebase.initializeApp");
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();

        firebase.auth().onAuthStateChanged(user => {

            console.warn("firebase onAuthStateChanged", user !== null);

            if (user) {
                this.user = user;
                this.setSignedIn(true);
                this.startListeners();
                this.startDataListener();
            } else {
                this.user = null;
                this.setSignedIn(false);
                this.stopListeners();
                this.stopDataListener();
                this.clearData();
            }
        })

        this.startDataListener();

    }

    stopListeners() {
        console.log("FirebaseStore.destroy");
        if (this.unsubscribeUsers) this.unsubscribeUsers();
    }

    startListeners() {
        console.log("firebaseStore: startListeners");
        const db = firebase.firestore();
        this.unsubscribeUsers = db
            .collection('users')
            .onSnapshot(snapshot => {
                console.log("FirebaseStore: users snapshot received");
                snapshot.forEach(doc => {
                        // console.log("FirebaseStore: users snapshot:", doc.id, doc.data);
                        // this.users.push({...doc.data(), uid: doc.id})
                        this.rootStore.userStore.setUser(doc.data(), doc.id);
                    }
                );
            });
    }

    stopDataListener() {
        console.log("FirebaseStore.destroy");
        if (this.unsubscribePresets) this.unsubscribePresets();
    }

    startDataListener() {
        console.log("firebaseStore: startDataListener");
        // this.unsubscribeUsers =
        //     this.data().onSnapshot(snapshot => {
        //         console.log("FirebaseStore: data snapshot received");
        //         snapshot.forEach(doc => {
        //                 console.log("FirebaseStore: data snapshot:", doc.id, doc.data);
        //                 // this.users.push({...doc.data(), uid: doc.id})
        //                 this.rootStore.dataStore.setData(doc.data(), doc.id);
        //             }
        //         );
        //     });
        this.unsubscribePresets = this.presets().onSnapshot(snapshot => {
            console.log("FirebaseStore: presets snapshot received");
            snapshot.forEach(doc => {
                    // console.log("FirebaseStore: presets snapshot:", doc.id, doc.data);
                    // this.users.push({...doc.data(), uid: doc.id})
                    this.rootStore.dataStore.setPreset(doc.data(), doc.id);
                }
            );
        });
    }

    setSignedIn(signedIn) {
        this.signedIn = signedIn;
    }

    clearData() {
        this.rootStore.userStore.clearUsers();
        this.rootStore.dataStore.clearPresets();
    }

    // setFirebase = firebase => {
        // this.firebase = firebase;
    // };

    loadUsers() {

    }

    // utils

    // foo = () => console.log('bar', this.db);

    // user = uid => this.db.doc(`users/${uid}`);

    users = () => this.db.collection('users');

    preset = uid => this.db.doc(`presets/${uid}`);

    presets = () => this.db.collection('presets');

    // data = () => this.db.collection('data');

}

export default FirebaseStore;
