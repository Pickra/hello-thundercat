import { userActions } from "../stores/userStore";

export interface User {
    isLoggedIn: boolean;
    hasSelectedCharacter: boolean;
    character?: string;
}

const defaultState:User = {
    isLoggedIn: false,
    hasSelectedCharacter: false,
    character: undefined
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case userActions.login:
            return { ...state, isLoggedIn: action.payload.isLoggedIn };
        case userActions.selectCharacter:
            return {
                ...state,
                hasSelectedCharacter: action.payload.hasSelectedCharacter,
                character: action.payload.character
            };
        default:
            return state;
    }
};
