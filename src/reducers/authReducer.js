import { LOGOUT, REGISTER_SUCCESS, REGISTER_ATTEMPT, REGISTER_FAIL, CLEAR_ERROR, LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, USER_STATE_CHANGED, EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAIL, EDIT_USER_INFO_ATTEMPT, CAST_VOTE_SUCCESS } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    admin: false,
    error: null,
    user: {
        coupons: [],
        completedSurveys: []
    },
    usersForAdmin: [],
    loading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_STATE_CHANGED:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                loading: false,
                // set do default object so it wont be null
                user: action.payload.user || {
                    coupons: [],
                    completedSurveys: []
                },
                admin: action.payload.admin
            };
        case EDIT_USER_INFO_SUCCESS:
            return {
                ...state,
                user: { ...state.user, fname: action.payload.fname, lname: action.payload.lname },
                loading: false,
                // This is not an error but an indication for the change
                error: 'Successfully updated'
            };
        case REGISTER_ATTEMPT:
        case LOGIN_ATTEMPT:
        case EDIT_USER_INFO_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case EDIT_USER_INFO_FAIL:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                loading: false,
                user: {
                    coupons: [],
                    completedSurveys: []
                }
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case CAST_VOTE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    completedSurveys: [...state.user.completedSurveys, action.payload.surveyId],
                    choices: [...state.user.choices, action.payload.choices],
                    coupons: [...state.user.coupons, action.payload.coupon]
                }
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        default:
            return state;
    }
}
