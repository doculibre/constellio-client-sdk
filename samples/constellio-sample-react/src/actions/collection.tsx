import {
    COLLECTION_RESPONSE,
    COLLECTION_FAILURE,
    SET_MESSAGE
} from "./types";

import CollectionService from "../services/collection.service";

export const getCollections = (token: string, id: string[]) => (dispatch: any) => {
    return CollectionService.getConstellioCollections(token).then(
        (data: any) => {
            dispatch({
                type: COLLECTION_RESPONSE,
                payload: {data: data},
            });

            return Promise.resolve();
        },
        (error: any) => {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message;

            message = message || "Constellio might be down!"
            dispatch({
                type: COLLECTION_FAILURE,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};