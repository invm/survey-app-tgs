import { LOGOUT, REGISTER_SUCCESS, REGISTER_ATTEMPT, REGISTER_FAIL, CLEAR_ERROR, LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, USER_STATE_CHANGED, EDIT_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_ATTEMPT } from '../actions/types';

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
                user: action.payload.user,
                admin: action.payload.admin
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                // This is not an error but an indication for the change
                error: 'Successfully updated'
            };
        case REGISTER_ATTEMPT:
        case LOGIN_ATTEMPT:
        case EDIT_USER_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case EDIT_USER_FAIL:
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
