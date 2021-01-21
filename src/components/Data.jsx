import {observer} from "mobx-react";
import {rootStore} from "../stores";

export const Data = observer(() => {

    console.log("Data()");

    if (!rootStore.firebaseStore.signedIn) {
        // console.log("Data: signedIn is false");
        return null;
    }

    // console.log("Data: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Data</h2>
            {/*<pre>{JSON.stringify(users)}</pre>*/}
            <button onClick={rootStore.dataStore.addPreset} >Add preset</button>
        </div>
    );
});
