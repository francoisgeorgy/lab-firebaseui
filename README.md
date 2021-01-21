## Project setup

    firebase init
    firebase use --add

    yarn add firebase
    yarn add react-firebaseui

## Architecture

The components deal with userStore, sessionStore and dataStore. They don't deal directly with Firebase (firebaseStore).

The userStore, sessionStore and dataStore deal with Firebase.  


## Data model

https://firebase.google.com/docs/firestore/data-model

Data are stored in _documents_ which are organized in _collections_.

Each document is identified by a name.

Each document contains a set of key-value pairs. 

Documents can contain _subcollections_.

    collection
        document    
            {name may be an uid}
            {keys values}
        document
            ...
        document
            ...
            collection
                document
                    ...
                document
                    ...
        ...

In this lab:

    users           - top-level collection
        {name is uid}
        {email, 
        username} 
    presets         - top-level collection
        {name}
        {user-uid, ...}
        




