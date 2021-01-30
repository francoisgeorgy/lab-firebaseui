import FirebaseStore from "./firebaseStore";
import SessionStore from "./sessionStore";
import UserStore from "./userStore";
import {DataStore} from "./dataStore";
// import MessageStore from "./messageStore";

/**
 * FirebaseStore : host the Firebase app instance. Manage all interactions with Firebase.
 * SessionStore : host the current logged in user.
 * UserStore : host the users.
 * DataStore : host the data.
 */
class RootStore {
    constructor() {

        console.log("RootStore.constructor");

        this.fire = new FirebaseStore(this);
        this.session = new SessionStore(this);
        this.users = new UserStore(this);
        this.data = new DataStore(this);
        // this.messageStore = new MessageStore(this);
    }
}

export const stores = new RootStore();

// export default stores;
