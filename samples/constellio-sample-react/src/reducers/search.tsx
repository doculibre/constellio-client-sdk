import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
} from "../actions/types";

const initialState:any =[];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                data: payload.data,
                results:payload.data.results,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                message: "oops!",
            };
        default:
            return state;
    }
}