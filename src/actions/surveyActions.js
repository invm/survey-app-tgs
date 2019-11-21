import {
    CREATE_SURVEY_ATTEMPT,
    CREATE_SURVEY_SUCCESS,
    CREATE_SURVEY_FAIL,
    EDIT_SURVEY_ATTEMPT,
    EDIT_SURVEY_SUCCESS,
    EDIT_SURVEY_FAIL,
    DELETE_SURVEY_ATTEMPT,
    DELETE_SURVEY_SUCCESS,
    DELETE_SURVEY_FAIL,
    FETCH_SURVEYS_ATTEMPT,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    ADD_CATEGORY_ATTEMPT,
    ADD_CATEGORY,
    ADD_CATEGORY_ERROR,
    DELETE_CATEGORY_ATTEMPT,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    REDEEM_COUPON_ATTEMPT,
    REDEEM_COUPON_SUCCESS,
    REDEEM_COUPON_FAIL,
    CAST_VOTE_ATTEMPT,
    CAST_VOTE_SUCCESS,
    CAST_VOTE_FAIL
} from './types';

import 'firebase/firestore';

import { db, auth, firebase } from '../config/fb';

export const castVote = (surveyId, surveyAnswers) => dispatch => {
    dispatch({ type: CAST_VOTE_ATTEMPT });
    let user = auth.currentUser;
    let surveyRef = db.collection('surveys').doc(surveyId);
    surveyRef
        .get()
        .then(survey => {
            if (survey.exists) {
                let voted = survey.data().voted;
                if (!voted.includes(user.uid)) {
                    surveyRef
                        .update({
                            voted: firebase.firestore.FieldValue.arrayUnion(user.uid)
                        })
                        .then(() => {
                            // Now update users db and add answers to his collection
                            db.collection('users')
                                .doc(user.uid)
                                .update({
                                    completedSurveys: firebase.firestore.FieldValue.arrayUnion(surveyId)
                                });
                        })
                        .then(() => {
                            //update choices collection
                            db.collection('users')
                                .doc(user.uid)
                                .collection('choices')
                                .doc(surveyId)
                                .set(surveyAnswers)
                                //@todo return results and show in survey component
                                .then(() => dispatch({ type: CAST_VOTE_SUCCESS, payload: surveyId }))
                                .catch(error => dispatch({ type: CAST_VOTE_FAIL, payload: error.message }));
                        });
                } else dispatch({ type: CAST_VOTE_FAIL, payload: 'User has already voted' });
            } else dispatch({ type: CAST_VOTE_FAIL, payload: 'Survey does not exists' });
        })
        .catch(error => dispatch({ type: CAST_VOTE_FAIL, payload: error.message }));
};

export const fetchSurveys = () => dispatch => {
    dispatch({ type: FETCH_SURVEYS_ATTEMPT });
    let data = [];
    db.collection('surveys')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                data.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: FETCH_SURVEYS_SUCCESS,
                payload: data
            });
        })
        .catch(error =>
            dispatch({
                type: FETCH_SURVEYS_FAIL,
                payload: error.message
            })
        );
};

export const createSurvey = survey => dispatch => {
    dispatch({ type: CREATE_SURVEY_ATTEMPT });
    db.collection('surveys')
        .add(survey)
        .then(data =>
            dispatch({
                type: CREATE_SURVEY_SUCCESS,
                payload: survey
            })
        )
        .catch(error => dispatch({ type: CREATE_SURVEY_FAIL, payload: error.message }));
};
export const editSurvey = survey => dispatch => {
    dispatch({ type: EDIT_SURVEY_ATTEMPT });
    db.collection('surveys')
        .doc(survey.id)
        .set(survey)
        .then(data =>
            dispatch({
                type: EDIT_SURVEY_SUCCESS,
                payload: survey
            })
        )
        .catch(error => dispatch({ type: EDIT_SURVEY_FAIL, payload: error.message }));
};

export const deleteSurvey = id => dispatch => {
    dispatch({ type: DELETE_SURVEY_ATTEMPT });
    db.collection('surveys')
        .doc(id)
        .delete()
        .then(() =>
            dispatch({
                type: DELETE_SURVEY_SUCCESS,
                payload: id
            })
        )
        .catch(error =>
            dispatch({
                type: DELETE_SURVEY_FAIL,
                payload: error.message
            })
        );
};

// Categories fetch and add
let categories = [];
export const fetchCategories = () => dispatch => {
    db.collection('categories')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                categories.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: categories
            });
        })
        .catch(error => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: error.message }));
};

export const addCategory = category => dispatch => {
    dispatch({ type: ADD_CATEGORY_ATTEMPT });
    // Check if category exists
    let cat = categories.find(cat => cat.name === category);
    if (cat || category === '') {
        dispatch({ type: ADD_CATEGORY_ERROR, payload: 'Something went very wrong..' });
    } else {
        db.collection('categories')
            .add({ name: category })
            .then(doc => {
                dispatch({ type: ADD_CATEGORY, payload: { name: category, id: doc.id } });
            });
    }
};
export const deleteCategory = id => dispatch => {
    dispatch({ type: DELETE_CATEGORY_ATTEMPT });
    db.collection('categories')
        .doc(id)
        .delete()
        .then(() => {
            let cat = categories.find(cat => cat.id === id);
            categories.pop(cat);
            return dispatch({
                type: DELETE_CATEGORY_SUCCESS,
                payload: id
            });
        })
        .catch(error =>
            dispatch({
                type: DELETE_CATEGORY_FAIL,
                payload: error.message
            })
        );
};

export const redeemCoupon = (userId, id) => dispatch => {
    dispatch({ type: REDEEM_COUPON_ATTEMPT });
    db.collection('users')
        .doc(userId)
        .update({
            coupons: db.FieldValue.arrayRemove({ id: id })
        })
        .then(() => {
            return dispatch({
                type: REDEEM_COUPON_SUCCESS,
                payload: id
            });
        })
        .catch(error =>
            dispatch({
                type: REDEEM_COUPON_FAIL,
                payload: error.message
            })
        );
};
