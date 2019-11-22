import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import store from './store';
import { auth, db } from './config/fb';
import { LOGIN_ATTEMPT, USER_STATE_CHANGED } from './actions/types';

store.dispatch({ type: LOGIN_ATTEMPT });

// Keep track on user auth status
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
        });
        db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                // Deconstruct all needed data for the UI
                let { displayName, email, uid, admin } = user;
                let { coupons, fname, lname, completedSurveys } = doc.data();
                let choices = [];
                db.collection('users')
                    .doc(user.uid)
                    .collection('choices')
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(doc => choices.push({ id: doc.id, questions: doc.data() }));
                    })
                    .then(() => {
                        // Upon register the display name is not defined so do it manually
                        if (!displayName) displayName = `${fname} ${lname}`;
                        let data = { displayName, email, uid, coupons, fname, lname, completedSurveys, choices };
                        return store.dispatch({ type: USER_STATE_CHANGED, payload: { isAuthenticated: true, user: data, admin } });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    } else store.dispatch({ type: USER_STATE_CHANGED, payload: { isAuthenticated: false, user: null, admin: false } });
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
