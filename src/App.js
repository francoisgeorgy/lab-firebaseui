import React from 'react';
import {SignInScreen} from "./components/SignIn";
import {DataDump} from "./components/DataDump";
import {Users} from "./components/Users";
import './App.css';

export function App() {

    console.log("App()");

    return (
        <div className="App">
            <SignInScreen />
            <Users />
            <DataDump />
        </div>
    );
}
