import { CREATE_SURVEY, EDIT_SURVEY, DELETE_SURVEY, ADD_CATEGORY } from './types';

export const createSurvey = survey => dispatch =>
    dispatch({
        type: CREATE_SURVEY,
        payload: survey
    });
export const editSurvey = survey => dispatch =>
    dispatch({
        type: EDIT_SURVEY,
        payload: survey
    });

export const deleteSurvey = id => dispatch =>
    dispatch({
        type: DELETE_SURVEY,
        payload: id
    });

export const addCategory = category => dispatch =>
    dispatch({
        type: ADD_CATEGORY,
        payload: category
    });
