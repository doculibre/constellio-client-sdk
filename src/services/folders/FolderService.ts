import {Authentication} from "../../types/common/classes/authentication";
import {
    getFoldersFunc,
    getFolderFunc,
    getFolderSummaryFunc,
    getFoldersSummariesFunc
} from "../../types/common/services/constellio-service";
import axios from 'axios';
import Folder from "../../types/common/classes/folder";

export const getFolder: getFolderFunc = (authenticationObject: Authentication, id: string): Promise<Folder> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/folders";
    const params = {
        id,
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            if (response.data) {
                resolve(response.data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio folders " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders " + id});
        });
    });
}

export const getFolders: getFoldersFunc = (authenticationObject: Authentication, ids: string[]): Promise<Folder[]> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/folders";
    const params = {
        id: buildIdsParam(ids),
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let constellioFolders: Folder[] = [];
            if (response.data) {
                constellioFolders.push(response.data);
                resolve(constellioFolders);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio folders: " + buildIdsParam(ids)});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders: " + buildIdsParam(ids)});
        });
    });
}


export const getFolderSummary: getFolderSummaryFunc = (authenticationObject: Authentication, id: string): Promise<any> =>
{
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/folders";
    const params = {
        id,
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            if (response.data) {
                resolve(response.data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio folders " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders " + id});
        });
    });
}

export const getFoldersSummaries: getFoldersSummariesFunc = (authenticationObject: Authentication, ids: string[]): Promise<any> =>
{
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/folders";
    const params = {
        id: buildIdsParam(ids),
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let constellioFolders: Folder[] = [];
            if (response.data) {
                constellioFolders.push(response.data);
                resolve(constellioFolders);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio folders summaries: " + buildIdsParam(ids)});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders summaries: " + buildIdsParam(ids)});
        });
    });
}

const buildAuthenticatedHeader = (token: string | undefined): any => {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

const buildIdsParam = (ids: string[]): string => {
    return ids.join(",")
}