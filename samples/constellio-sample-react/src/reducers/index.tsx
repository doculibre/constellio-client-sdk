import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import folder from "./folder";
import collection from "./collection";
import search from "./search";

export default combineReducers({
    auth,
    search,
    message,
    folder,
    collection,
});