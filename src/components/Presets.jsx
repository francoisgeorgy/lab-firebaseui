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

    // const deletePreset = (presetId) => {
    //     console.log("remove", presetId);
    //     stores.data.deletePreset(presetId);
    // }

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
                <button onClick={stores.data.createPreset}>Create preset</button>
            </div>
            <div>
                {/*{JSON.stringify(Object.entries(stores.data.presets), null, 4)}*/}
                {entries(stores.data.presets).map(
                    ([key, preset], i) =>
                        <div key={key}>{i} - {key} - {preset.name} <button onClick={() => stores.data.deletePreset(key)}>delete</button></div>
                )}
            </div>
            <pre>{JSON.stringify(stores.data.presets, null, 4)}</pre>
        </div>
    );
});
