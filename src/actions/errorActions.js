import { SET_ERROR, CLEAR_ERROR } from './types';

export const setError = msg => dispatch => {
    dispatch({ type: SET_ERROR, payload: msg });
    setTimeout(clearError, 5000);
};

export const clearError = () => dispatch => dispatch({ type: CLEAR_ERROR });
