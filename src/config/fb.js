import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDCZ8TYVC0D4XowZnv527aTg3jrbAqmFg4',
    authDomain: 'survey-app-tgs.firebaseapp.com',
    databaseURL: 'https://survey-app-tgs.firebaseio.com',
    projectId: 'survey-app-tgs',
    storageBucket: 'survey-app-tgs.appspot.com',
    messagingSenderId: '291943095293',
    appId: '1:291943095293:web:3a794d5e456fba47425794'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
