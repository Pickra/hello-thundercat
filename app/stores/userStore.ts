import { createStore } from "redux";
import { loadState } from "../localStorage";
import userReducer from "../reducers/userReducer";

export enum userActions {
    login = "LOGIN",
    logout = "LOGOUT",
    selectCharacter = "SELECT_CHARACTER"
}

const persistedState = loadState();

export default createStore(userReducer, persistedState);
