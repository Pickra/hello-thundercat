import { createStore } from "redux";
import userReducer from "../reducers/userReducer";

export enum userActions {
    login = "LOGIN",
    selectCharacter = "SELECT_CHARACTER"
}

const store = createStore(userReducer);

export default store;
