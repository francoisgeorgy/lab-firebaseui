import {observer} from "mobx-react";
import {rootStore} from "../stores";
import firebase from "firebase";

export const DataDump = observer(() => {

    console.log("DataDump()");

    if (!rootStore.firebaseStore.signedIn) {
        console.log("DataDump: signedIn is false");
        return null;
    }

    console.log("DataDump: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Data dump</h2>
            <pre>{JSON.stringify(rootStore.dataStore.data, null, 4)}</pre>
        </div>
    );
});
