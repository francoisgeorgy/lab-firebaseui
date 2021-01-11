import {observable, action, makeAutoObservable} from 'mobx';

class SessionStore {

    rootStore = null;
    authUser = null;

    constructor(rootStore) {

        console.log("sessionStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            setAuthUser: action
        });
        this.rootStore = rootStore;
    }

    setAuthUser = authUser => {
        this.authUser = authUser;
    };

}

export default SessionStore;
