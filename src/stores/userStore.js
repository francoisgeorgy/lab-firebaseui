import {action, computed, makeAutoObservable} from 'mobx';

class UserStore {

    rootStore = null;
    users = null;

    constructor(rootStore) {

        console.log("UserStore.constructor");

        makeAutoObservable(this, {
            rootStore: false,
            setUsers: action,
            setUser: action,
            userList: computed
        });
        this.rootStore = rootStore;
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

    get userList() {
        return Object.keys(this.users || {}).map(key => ({
            ...this.users[key],
            uid: key,
        }));
    }

}

export default UserStore;
