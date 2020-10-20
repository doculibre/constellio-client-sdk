import {
    COLLECTION_RESPONSE,
    COLLECTION_FAILURE
} from "../actions/types";

const initialState:any =[];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case COLLECTION_RESPONSE:
            return {
                ...state,
                data: payload,
            };
        default:
            return state;
    }
}