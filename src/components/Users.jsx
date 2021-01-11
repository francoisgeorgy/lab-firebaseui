import {observer} from "mobx-react";
import {rootStore} from "../stores";
import {YouMustBeLoggedIn} from "./YouMustBeLoggedIn";

export const Users = observer(() => {

    console.log("Users()");

    if (!rootStore.firebaseStore.signedIn) {
        console.log("Users: signedIn is false");
        return <YouMustBeLoggedIn />;
    }

    // console.log("Users: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Users</h2>
            <pre>{JSON.stringify(rootStore.userStore.userList, null, 4)}</pre>
        </div>
    );
});
