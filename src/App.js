import React from 'react';
import {SignInScreen} from "./components/SignIn";
import {DataDump} from "./components/DataDump";
import {Users} from "./components/Users";
import './App.css';
import {Data} from "./components/Data";
import {Presets} from "./components/Presets";

export function App() {

    console.log("App()");

    return (
        <div className="App">
            <SignInScreen />
            <Presets />
            <Data />
            <DataDump />
            <Users />
        </div>
    );
}
