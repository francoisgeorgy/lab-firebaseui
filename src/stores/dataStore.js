import {action, makeAutoObservable} from 'mobx';
import firebase from "firebase";

export class DataStore {

    rootStore = null;
    data = null;

    constructor(rootStore) {

        console.log("DataStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            setData: action,
            clearData: action
            // dataList: computed
        });
        this.rootStore = rootStore;

        this.startListeners();
    }

    // stopListeners() {
    //     console.log("FirebaseStore.destroy");
    //     if (this.unsubscribe) this.unsubscribe();
    // }

    startListeners() {
        const db = firebase.firestore();
        this.unsubscribe = db
            .collection('data')
            .onSnapshot(snapshot => {
                console.log("DataStore: data snapshot received");
                snapshot.forEach(doc => {
                        console.log("DataStore: data snapshot:", doc.id, doc.data);
                        // this.users.push({...doc.data(), uid: doc.id})
                        this.setData(doc.data(), doc.id);
                    }
                );
            });
    }

    setData = (data, uid) => {
        if (!this.data) {
            this.data = {};
        }
        this.data[uid] = data;
    };

    clearData = () => {
        this.data = null;
    }

    addData = () => {

        const db = firebase.firestore();

        // const db = this.rootStore.firebaseStore.db.ref('messages');
        // this.rootStore.firebaseStore.db.ref('messages').push({
        //     text: "blabla"
        //     // userId: 123,
        //     // createdAt: this.props.firebase.serverValue.TIMESTAMP,
        // });

        db.collection("data").add({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        })
        .then(function() {
            console.log("addData: document successfully written!");
        })
        .catch(function(error) {
            console.error("addData: error writing document: ", error);
        });

    }


}

// export default DataStore;
