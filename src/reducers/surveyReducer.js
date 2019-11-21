import {
    CREATE_SURVEY_ATTEMPT,
    CREATE_SURVEY_SUCCESS,
    CREATE_SURVEY_FAIL,
    EDIT_SURVEY_ATTEMPT,
    EDIT_SURVEY_SUCCESS,
    EDIT_SURVEY_FAIL,
    DELETE_SURVEY_ATTEMPT,
    DELETE_SURVEY_FAIL,
    DELETE_SURVEY_SUCCESS,
    ADD_CATEGORY,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_ATTEMPT,
    FETCH_SURVEYS_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORY_ATTEMPT,
    ADD_CATEGORY_ERROR,
    DELETE_CATEGORY_ATTEMPT,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CAST_VOTE_ATTEMPT,
    CAST_VOTE_SUCCESS,
    CAST_VOTE_FAIL,
    CLEAR_ERROR
} from '../actions/types';

const initialState = {
    categories: [],
    error: null,
    surveys: [],
    surveyLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_SURVEYS_ATTEMPT:
        case CREATE_SURVEY_ATTEMPT:
        case EDIT_SURVEY_ATTEMPT:
        case DELETE_SURVEY_ATTEMPT:
        case DELETE_CATEGORY_ATTEMPT:
        case ADD_CATEGORY_ATTEMPT:
        case CAST_VOTE_ATTEMPT:
            return {
                ...state,
                surveyLoading: true
            };
        case FETCH_SURVEYS_FAIL:
        case ADD_CATEGORY_ERROR:
        case DELETE_CATEGORY_FAIL:
        case CREATE_SURVEY_FAIL:
        case EDIT_SURVEY_FAIL:
        case DELETE_SURVEY_FAIL:
        case CAST_VOTE_FAIL:
            return {
                ...state,
                error: action.payload,
                surveyLoading: false
            };
        case FETCH_SURVEYS_SUCCESS:
            return {
                ...state,
                surveys: action.payload,
                surveyLoading: false
            };
        case CREATE_SURVEY_SUCCESS:
            return {
                ...state,
                surveys: [...state.surveys, action.payload],
                surveyLoading: false
            };
        case EDIT_SURVEY_SUCCESS:
            return {
                ...state,
                surveyLoading: false,
                surveys: state.surveys.map(survey => {
                    if (survey.id === action.payload.id) {
                        return action.payload;
                    }
                    return survey;
                })
            };
        case DELETE_SURVEY_SUCCESS:
            return {
                ...state,
                surveyLoading: false,
                surveys: state.surveys.filter(survey => survey.id !== action.payload)
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                surveyLoading: false
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== action.payload),
                surveyLoading: false
            };
        case CAST_VOTE_SUCCESS:
            return {
                ...state,
                surveyLoading: false
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
