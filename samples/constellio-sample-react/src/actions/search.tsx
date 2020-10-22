import {
    SET_MESSAGE, SEARCH_SUCCESS, SEARCH_FAILURE
} from "./types";

import SearchService from "../services/search.service";
import Sort from "../../../../src/types/common/classes/sort";

export const search = (token: string, searchExpression: string) => (dispatch: any) => {
    let query: any =
        {
            collection: "zeCollection",
            expression: searchExpression,
            facetMode: 0,
            requireWriteAccess: false,
            rowsLimit: 100,
            rowsStart: 0,
            schemaTypes: [],
            sorting: []
        }

    return SearchService.searchConstellio(token, query).then(
        (data: any) => {
            dispatch({
                type: SEARCH_SUCCESS,
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
                type: SEARCH_FAILURE,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};