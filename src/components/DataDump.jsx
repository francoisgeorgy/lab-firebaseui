import {observer} from "mobx-react";
import {stores} from "../stores";
import {YouMustBeLoggedIn} from "./YouMustBeLoggedIn";

export const DataDump = observer(() => {

    // console.log("DataDump()");

    if (!stores.fire.signedIn) {
        // console.log("DataDump: signedIn is false");
        return <YouMustBeLoggedIn />;
    }

    // console.log("DataDump: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h3>presets:</h3>
            {/*<pre>{JSON.stringify(dbstore.user, null, 4)}</pre>*/}
            <pre>{JSON.stringify(stores.data.presets, null, 4)}</pre>
        </div>
    );
});
