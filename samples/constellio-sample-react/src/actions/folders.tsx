import {
    FOLDER_RESPONSE,
    FOLDER_FAIL,
    SET_MESSAGE
} from "./types";

import FolderService from "../services/folder.service";

export const getFolders = (token: string, id: string[]) => (dispatch: any) => {
    return FolderService.getConstellioFolders(token, id).then(
        (data: any) => {
            dispatch({
                type: FOLDER_RESPONSE,
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
                type: FOLDER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};