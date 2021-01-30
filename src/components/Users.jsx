import {observer} from "mobx-react";
import {stores} from "../stores";
import {YouMustBeLoggedIn} from "./YouMustBeLoggedIn";

export const Users = observer(() => {

    // console.log("Users()");

    if (!stores.fire.signedIn) {
        // console.log("Users: signedIn is false");
        return <YouMustBeLoggedIn />;
    }

    // console.log("Users: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Users</h2>
            <pre>{JSON.stringify(stores.users.userList, null, 4)}</pre>
        </div>
    );
});
