import { CREATE_SURVEY } from './types';

export const createSurvey = survey => dispatch => {
    dispatch({
        type: CREATE_SURVEY,
        payload: survey
    });
};
