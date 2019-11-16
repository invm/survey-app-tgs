import { LOGOUT, REGISTER_SUCCESS, REGISTER_ATTEMPT, REGISTER_FAIL } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    role: '',
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
                isAuthenticated: true,
                role: 'admin',
                user: null,
                usersForAdmin: [],
                loading: false
            };
        case REGISTER_FAIL:
        case LOGOUT:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
