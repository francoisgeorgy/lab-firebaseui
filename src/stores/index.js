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

        this.firebaseStore = new FirebaseStore(this);
        this.sessionStore = new SessionStore(this);
        this.userStore = new UserStore(this);
        this.dataStore = new DataStore(this);
        // this.messageStore = new MessageStore(this);
    }
}

export const rootStore = new RootStore();

// export default rootStore;
