import React from 'react';
import {SignInScreen} from "./components/SignIn";
import './App.css';

export function App() {

    console.log("App()");

    return (
        <div className="App">
            <SignInScreen />
        </div>
    );
}
