import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, REGISTER_ATTEMPT, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAIL, EDIT_USER_INFO_ATTEMPT, EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAIL } from './types';

import { auth, db } from '../config/fb';

// Register User
export const register = ({ email, password, fname, lname }) => dispatch => {
    dispatch({
        type: REGISTER_ATTEMPT
    });
    auth.createUserWithEmailAndPassword(email, password)
        .then(credentials => {
            credentials.user
                .updateProfile({
                    displayName: `${fname} ${lname}`
                })
                .then(() =>
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: credentials.user
                    })
                );
            return db
                .collection('users')
                .doc(credentials.user.uid)
                .set({
                    fname,
                    lname,
                    coupons: [],
                    completedSurveys: []
                });
        })
        .catch(error =>
            dispatch({
                type: REGISTER_FAIL,
                payload: error.message
            })
        );
};

// Login User
export const login = ({ email, password }) => dispatch => {
    dispatch({
        type: LOGIN_ATTEMPT
    });
    auth.signInWithEmailAndPassword(email, password)
        .then(credentials =>
            dispatch({
                type: LOGIN_SUCCESS
            })
        )
        .catch(error =>
            dispatch({
                type: LOGIN_FAIL,
                payload: error.message
            })
        );
};

// Log out
export const logout = () => dispatch => {
    auth.signOut()
        .then(() =>
            dispatch({
                type: LOGOUT
            })
        )
        .catch(error =>
            dispatch({
                type: REGISTER_FAIL,
                payload: error.message
            })
        );
};

export const updateUser = ({ fname, lname }) => dispatch => {
    dispatch({ type: EDIT_USER_INFO_ATTEMPT });
    var user = auth.currentUser;
    user.updateProfile({
        displayName: `${fname} ${lname}`
    })
        .then(() => {
            db.collection('users')
                .doc(user.uid)
                .update({
                    fname: fname,
                    lname: lname
                })
                .then(() => dispatch({ type: EDIT_USER_INFO_SUCCESS, payload: { fname, lname } }));
        })
        .catch(error => dispatch({ type: EDIT_USER_INFO_FAIL, payload: error.message }));
};
