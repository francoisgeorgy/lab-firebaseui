import {observer} from "mobx-react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {rootStore} from "../stores";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        'anonymous',    // from firebaseui-web/externs/firebaseui-externs.js
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

export const SignInScreen = observer(() => {

    // console.log("SignInScreen()");

    // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    // useEffect(() => {
    //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
    //         setIsSignedIn(!!user);
    //     });
    //     return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // }, []);

    if (!rootStore.firebaseStore.signedIn) {
        // console.log("SignInScreen: signedIn is false");
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    // console.log("SignInScreen: signedIn is true");

    return (
        <div>
            <h1>My App</h1>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>
    );
});
