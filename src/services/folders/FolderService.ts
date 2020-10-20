import {Authentication} from "../../types/common/classes/authentication";
import axios from 'axios';
import Folder, {
    getFoldersFunc,
    getFolderFunc,
    getFolderSummaryFunc,
    getFoldersSummariesFunc
} from "../../types/common/classes/folder";
import {API_VERSION} from "../../constant";

export const getFolder: getFolderFunc = async (authenticationObject: Authentication, id: string): Promise<Folder> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/folders/" + id;
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers, params: {filterMode: "ALL"}})
            .then(function (response: any) {
                if (response.data) {
                    let data = buildFolderRecord(response.data);
                    resolve(data);
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
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/folders/";
    let promises: Promise<any>[] = [];
    for (let i = 0; i < ids.length || 0; i++) {
        promises[i] = new Promise((resolve, reject) => {
            axios.get(generateUrl + ids[i], {headers, params: {filterMode: "ALL"}}).then(function (response: any) {
                if (response.data) {
                    let data = buildFolderRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio folders " + ids[i]});
                }
            }).catch(error => {
                reject({message: error, error: "Could not fetch Constellio folders: " + buildIdsParam(ids)});
            });
        });
    }
    return Promise.all(promises);
}


export const getFolderSummary: getFolderSummaryFunc = (authenticationObject: Authentication, id: string): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/folders/" + id;
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers})
            .then(function (response: any) {
                if (response.data) {
                    let data = buildFolderRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio folders " + id});
                }
            }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders " + id});
        });
    });
}

export const getFoldersSummaries: getFoldersSummariesFunc = (authenticationObject: Authentication, ids: string[]): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/folders/";
    let promises: Promise<any>[] = [];
    for (let i = 0; i < ids.length || 0; i++) {
        promises[i] = new Promise((resolve, reject) => {
            axios.get(generateUrl + ids[i], {headers}).then(function (response: any) {
                if (response.data) {
                    let data = buildFolderRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio folders " + ids[i]});
                }
            }).catch(error => {
                reject({message: error, error: "Could not fetch Constellio folders: " + buildIdsParam(ids)});
            });
        });
    }
    return Promise.all(promises);
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

const buildFolderRecord = (record: Folder): Folder => {
    if (record.metadatas) {
        record.hasContent = (record.metadatas.hasContent && record.metadatas.hasContent[0] && record.metadatas.hasContent[0] === 'true') || false;
        record.modifiedOn = record.metadatas.modifiedOn && record.metadatas.modifiedOn[0];
        record.createdOn = record.metadatas.createdOn && record.metadatas.createdOn[0];
        record.title = record.metadatas.title && record.metadatas.title[0];
        record.description = record.metadatas.description && record.metadatas.description[0];
        if (record.administrativeUnit) {
            record.administrativeUnit = {
                id: record.metadatas.administrativeUnit && record.metadatas.administrativeUnit[0],
                code: record.metadatas.administrativeUnit && record.metadatas.administrativeUnit[0],
                title: record.metadatas.administrativeUnit && record.metadatas.administrativeUnit[0]
            };
        }
        if (record.category) {
            record.category = {
                id: record.metadatas.category && record.metadatas.category[0],
                code: record.metadatas.category && record.metadatas.category[0],
                title: record.metadatas.category && record.metadatas.category[0]
            };
        }
    }
    return record;
}