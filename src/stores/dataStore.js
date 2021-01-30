import {action, makeAutoObservable} from 'mobx';
import firebase from "firebase";

export class DataStore {

    stores = null;

    // The list of presets:
    presets = new Map();

    unsubscribePresets = null;

    constructor(stores) {

        console.log("DataStore.constructor");

        makeAutoObservable(this, {
            stores: false,
            setPreset: action,
            clearPresets: action
            // presetList: computed
        });
        this.stores = stores;

        this.startDataListener();

        // this.startListeners();
    }

    setPreset = (preset, uid) => {
        console.log("setPreset", uid);
        this.presets.set(uid, preset);
    };

    clearPresets = () => {
        this.presets.clear();
    }

    startDataListener() {
        console.log("DataStore: startDataListener");

        // Presets:
        this.unsubscribePresets = this.stores.fire.presets().onSnapshot(snapshot => {
            console.log("DataStore: presets snapshot received");
            snapshot.forEach(doc => {
                // @ts-ignore
                this.setPreset(doc.data(), doc.id);
            });
        });

        // Messages:
        // this.unsubscribeMessages = this.stores.fire.messages().onSnapshot(snapshot => {
        //     console.log("DataStore: messages snapshot received");
        //     snapshot.forEach(doc => {
        //         // @ts-ignore
        //         this.setMessage(doc.data(), doc.id);
        //     });
        // });
    }

    stopListeners() {
        if (this.unsubscribePresets) this.unsubscribePresets();
    }

    // startListeners() {
    //     const db = firebase.firestore();
    //     this.unsubscribeUsers = db
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

}

// export const datastore = new DataStore();
