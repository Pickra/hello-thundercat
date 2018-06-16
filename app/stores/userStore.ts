import { createStore } from "redux";
import userReducer from "../reducers/userReducer";

export enum userActions {
    login = "LOGIN",
    selectCharacter = "SELECT_CHARACTER"
}

export default createStore(userReducer);
