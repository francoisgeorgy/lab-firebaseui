import {action, computed, makeAutoObservable} from 'mobx';

class UserStore {

    stores = null;
    users = null;

    constructor(stores) {

        console.log("UserStore.constructor");

        makeAutoObservable(this, {
            stores: false,
            setUsers: action,
            setUser: action,
            userList: computed
        });
        this.stores = stores;
    }

    setUsers = users => {
        this.users = users;
    };

    setUser = (user, uid) => {
        if (!this.users) {
            this.users = {};
        }
        this.users[uid] = user;
    };

    clearUsers = () => {
        this.users = null;
    }

    get userList() {
        return Object.keys(this.users || {}).map(key => ({
            ...this.users[key],
            uid: key,
        }));
    }



}

export default UserStore;
