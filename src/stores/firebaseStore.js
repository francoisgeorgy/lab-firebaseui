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
 * Populate data, sessionStore and users.
 */
class fire {

    stores = null;
    // firebase = null;

    signedIn = false;
    user = null;
    unsubscribeUsers = null;
    unsubscribePresets = null;

    constructor(rootStore) {

        console.log("fire.constructor");

        makeAutoObservable(this, {
            stores: false,
            unsubscribeUsers: false,
            unsubscribePresets: false,
            setSignedIn: action
        });
        this.stores = rootStore;

        // Instantiate a Firebase app.
        console.log("fire.constructor: firebase.initializeApp");
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();

        firebase.auth().onAuthStateChanged(user => {

            console.warn("firebase onAuthStateChanged", user !== null);

            if (user) {
                this.user = user;
                this.setSignedIn(true);
                //this.startListeners();
                this.listenToDataUpdates();
            } else {
                this.user = null;
                this.setSignedIn(false);
                //this.stopListeners();
                this.stopListeningToDataUpdates();
                this.stores.users.clearUsers();
                this.stores.data.clearPresets();
            }
        })

        this.listenToDataUpdates();

    }
/*
    stopListeners() {
        console.log("fire.destroy");
        if (this.unsubscribeUsers) this.unsubscribeUsers();
    }

    startListeners() {
        console.log("fire: startListeners");
        const db = firebase.firestore();
        this.unsubscribeUsers = db
            .collection('users')
            .onSnapshot(snapshot => {
                console.log("fire: users snapshot received");
                snapshot.forEach(doc => {
                        // console.log("fire: users snapshot:", doc.id, doc.data);
                        // this.users.push({...doc.data(), uid: doc.id})
                        this.stores.users.setUser(doc.data(), doc.id);
                    }
                );
            });
    }
*/
    stopListeningToDataUpdates() {
        console.log("fire.stopListeningToDataUpdates");
        if (this.unsubscribeUsers) this.unsubscribeUsers();
        if (this.unsubscribePresets) this.unsubscribePresets();
    }

    listenToDataUpdates() {
        console.log("fire.listenToDataUpdates");
        this.unsubscribeUsers = this.users()
            .onSnapshot(snapshot => {
                console.log("fire: users snapshot received");
                snapshot.forEach(doc => {
                    this.stores.users.setUser(doc.data(), doc.id);
                });
            });
        this.unsubscribePresets = this.presets()
            .onSnapshot(snapshot => {
                console.log("fire: presets snapshot received");
                snapshot.forEach(doc => {
                    this.stores.data.setPreset(doc.id, doc.data());
                });
            });
    }

    /**
     * Create a preset in the firestore cloud
     * @returns {Promise<void>}
     */
    addPreset = async () => {
        try {
            await this.stores.fire.presets().add({
                userId: this.stores.fire.user.uid,
                name: `preset-${Math.round(Math.random()*1000)}`
            });
            console.log("addPreset: document successfully written!");
        } catch (error) {
            //console.error("addPreset: error writing document: ", error);
            throw new Error("addPreset: error writing preset: " + error.message());
        }
    }

    /**
     * Delete a preset from the firestore cloud
     * @param presetId
     * @returns {Promise<void>}
     */
    deletePreset = async (presetId) => {
        try {
            await this.stores.fire.preset(presetId).delete();
            console.log(`${presetId} deleted`);
        } catch (error) {
            //console.warn(`error deleting ${presetId}`, error);
            throw new Error("deletePreset: error deleting preset: " + error.message());
        }
    }

    setSignedIn(signedIn) {
        this.signedIn = signedIn;
    }


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

export default fire;
