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
        db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                // Deconstruct all needed data for the UI
                let { displayName, email, uid } = user;
                let { coupons, fname, lname, completedSurveys } = doc.data();
                let data = { displayName, email, uid, coupons, fname, lname, completedSurveys };
                return store.dispatch({ type: USER_STATE_CHANGED, payload: { isAuthenticated: true, user: data } });
            });
    } else store.dispatch({ type: USER_STATE_CHANGED, payload: { isAuthenticated: false, user: null, role: '' } });
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
