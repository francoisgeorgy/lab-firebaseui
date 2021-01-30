import {observer} from "mobx-react";
import {entries} from "mobx";
import {stores} from "../stores";
// import {useCallback} from "react/cjs/react.production.min";

export const Presets = observer(() => {

    // console.log("Presets()");

    // const remove = useCallback(
    //     (id) => {
    //         console.log("remove", id);
    //     },
    //     []
    // );

    const remove = (id) => {
        console.log("remove", id);
        stores.data.deletePreset(id);
    }

    if (!stores.fire.signedIn) {
        // console.log("Presets: signedIn is false");
        // return null;
    }

    // console.log("Presets: signedIn is true");

    // const db = firebase.firestore();
    // const users = () => db.collection('users');

    return (
        <div>
            <h2>Presets</h2>
            <div>
                <button onClick={stores.fire.addPreset} >Add preset</button>
            </div>
            <div>
                {/*{JSON.stringify(Object.entries(stores.data.presets), null, 4)}*/}
                {entries(stores.data.presets).map(
                    ([key, preset], i) =>
                        <div key={key}>
                            <div>{i} - {key}</div>
                            <div>{preset.name}</div>
                            <div><button onClick={() => remove(key)}>delete</button></div>
                        </div>
                )}
            </div>
            <pre>{JSON.stringify(stores.data.presets, null, 4)}</pre>
        </div>
    );
});
