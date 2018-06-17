import { userActions } from "../stores/userStore";
import Characters, {Character} from "../components/Characters";

export interface User {
    isLoggedIn: boolean;
    hasSelectedCharacter: boolean;
    headerTitle: string;
    character?: Character;
}

const defaultState:User = {
    isLoggedIn: false,
    hasSelectedCharacter: false,
    headerTitle: "ThunderCat",
    character: Characters["logo"]
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case userActions.login:
            return { ...state, isLoggedIn: action.payload.isLoggedIn };
        case userActions.selectCharacter:
            return {
                ...state,
                hasSelectedCharacter: action.payload.hasSelectedCharacter,
                headerTitle: action.payload.character,
                character: Characters[action.payload.character]
            };
        default:
            return state;
    }
};
