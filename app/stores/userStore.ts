import { createStore } from "redux";
import { loadState } from "../localStorage";
import userReducer from "../reducers/userReducer";

export enum userActions {
    login = "LOGIN",
    selectCharacter = "SELECT_CHARACTER"
}

const persistedState = loadState();

export default createStore(userReducer, persistedState);
