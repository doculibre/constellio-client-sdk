import {
    FOLDER_RESPONSE
} from "../actions/types";

const initialState:any =[];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case FOLDER_RESPONSE:
            return {
                ...state,
                data: payload,
            };
        default:
            return state;
    }
}