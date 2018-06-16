import { createStore } from "redux";
import userReducer from "../reducers/userReducer";

export enum userActions {
    login = "LOGIN"
}

export default createStore(userReducer);
