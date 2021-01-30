import {observable, action, makeAutoObservable} from 'mobx';

class SessionStore {

    stores = null;
    authUser = null;

    constructor(rootStore) {

        console.log("sessionStore.constructor");

        makeAutoObservable(this, {
            stores: false,
            setAuthUser: action
        });
        this.stores = rootStore;
    }

    setAuthUser = authUser => {
        this.authUser = authUser;
    };

}

export default SessionStore;
