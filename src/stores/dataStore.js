import {action, makeAutoObservable} from 'mobx';
import firebase from "firebase";

export class DataStore {

    rootStore = null;
    presets = {};

    constructor(rootStore) {

        console.log("DataStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            setPreset: action,
            clearPresets: action
            // presetList: computed
        });
        this.rootStore = rootStore;

        // this.startListeners();
    }

    // stopListeners() {
    //     console.log("FirebaseStore.destroy");
    //     if (this.unsubscribe) this.unsubscribe();
    // }

    // startListeners() {
    //     const db = firebase.firestore();
    //     this.unsubscribe = db
    //         .collection('preset')
    //         .onSnapshot(snapshot => {
    //             console.log("PresetStore: preset snapshot received");
    //             snapshot.forEach(doc => {
    //                     console.log("PresetStore: preset snapshot:", doc.id, doc.preset);
    //                     // this.users.push({...doc.preset(), uid: doc.id})
    //                     this.setPreset(doc.preset(), doc.id);
    //                 }
    //             );
    //         });
    // }

    setPreset = (preset, uid) => {
        // if (!this.presets) {
        //     this.presets = {};
        // }
        this.presets[uid] = preset;
    };

    clearPresets = () => {
        this.presets = {};
    }

    addPreset = () => {

        const db = firebase.firestore();

        // const db = this.rootStore.firebaseStore.db.ref('messages');
        // this.rootStore.firebaseStore.db.ref('messages').push({
        //     text: "blabla"
        //     // userId: 123,
        //     // createdAt: this.props.firebase.serverValue.TIMESTAMP,
        // });

        // db.collection("presets").add({
        this.rootStore.firebaseStore.presets().add({
            name: "HelloSpace",
            device: "BeatStation",
            genre: "pad"
        })
        .then(function() {
            console.log("addPreset: document successfully written!");
        })
        .catch(function(error) {
            console.error("addPreset: error writing document: ", error);
        });

    }


}

// export default DataStore;
