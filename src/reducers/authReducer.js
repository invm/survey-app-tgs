import { LOGOUT, REGISTER_SUCCESS, REGISTER_ATTEMPT, REGISTER_FAIL, CLEAR_ERROR, LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, USER_STATE_CHANGED } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    admin: false,
    error: null,
    user: null,
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
                user: action.payload.user
            };
        case REGISTER_ATTEMPT:
        case LOGIN_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                loading: false
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        default:
            return state;
    }
}
