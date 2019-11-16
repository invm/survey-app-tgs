import { LOGOUT, REGISTER_SUCCESS, REGISTER_ATTEMPT, REGISTER_FAIL, CLEAR_ERROR } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    role: '',
    error: null,
    user: null,
    usersForAdmin: [],
    loading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                role: 'admin'
            };
        case REGISTER_FAIL:
        case LOGOUT:
            return {
                ...state,
                error: action.payload,
                loading: false
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
