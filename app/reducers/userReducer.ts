import { userActions } from "../stores/userStore";

export interface User {
    isLoggedIn: boolean;
}

const defaultState:User = { isLoggedIn: false };

export default (state = defaultState, action) => {
    switch(action.type) {
        case userActions.login:
            return { ...state, isLoggedIn: action.payload.isLoggedIn };
        default:
            return state;
    }
};
