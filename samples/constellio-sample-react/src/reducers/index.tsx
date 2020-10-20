import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import folder from "./folder";
import collection from "./collection";

export default combineReducers({
    auth,
    message,
    folder,
    collection,
});