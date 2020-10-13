import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../actions/types";
import {User} from "../types/user";

const user:any = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user') || "") : {isLoggedIn:false};

const initialState:User = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}