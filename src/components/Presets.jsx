import {observer} from "mobx-react";
import {rootStore} from "../stores";
import {useCallback} from "react/cjs/react.production.min";

export const Presets = observer(() => {

    console.log("Presets()");

    // const remove = useCallback(
    //     (id) => {
    //         console.log("remove", id);
    //     },
    //     []
    // );

    const remove = (id) => {
        console.log("remove", id);
    }

    if (!rootStore.firebaseStore.signedIn) {
        console.log("Presets: signedIn is false");
        // return null;
    }

    console.log("Presets: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Presets</h2>
            <div>
                {/*{JSON.stringify(Object.entries(rootStore.dataStore.presets), null, 4)}*/}
                {Object.entries(rootStore.dataStore.presets).map(
                    ([key, preset], i) =>
                        <div key={key}>
                            <div>{i}</div>
                            <div>{preset.name}</div>
                            <div>{preset.device}</div>
                            <div>{preset.genre}</div>
                            <div><button onClick={() => remove(key)}>delete</button></div>
                        </div>
                )}
            </div>
        </div>
    );
});
