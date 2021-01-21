import {observer} from "mobx-react";
import {rootStore} from "../stores";
import {YouMustBeLoggedIn} from "./YouMustBeLoggedIn";

export const DataDump = observer(() => {

    // console.log("DataDump()");

    if (!rootStore.firebaseStore.signedIn) {
        // console.log("DataDump: signedIn is false");
        return <YouMustBeLoggedIn />;
    }

    // console.log("DataDump: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Data dump</h2>
            <pre>{JSON.stringify(rootStore.firebaseStore.user, null, 4)}</pre>
            <pre>{JSON.stringify(rootStore.dataStore.presets, null, 4)}</pre>
        </div>
    );
});
