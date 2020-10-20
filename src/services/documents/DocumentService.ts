import {Authentication} from "../../types/common/classes/authentication";
import axios from 'axios';
import Document, {
    getDocumentsFunc,
    getDocumentFunc,
    getDocumentSummaryFunc,
    getDocumentsSummariesFunc
} from "../../types/common/classes/document";
import {API_VERSION} from "../../constant";

export const getDocument: getDocumentFunc = async (authenticationObject: Authentication, id: string): Promise<Document> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/documents/" + id;
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers, params: {filterMode: "ALL"}}).then(response => {
            if (response.data) {
                let data = buildDocumentRecord(response.data);
                resolve(data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents " + id});
        });
    });
}

export const getDocuments: getDocumentsFunc = async (authenticationObject: Authentication, ids: string[]): Promise<Document[]> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/documents/";
    let promises: Promise<any>[] = [];
    for (let i = 0; i < ids.length || 0; i++) {
        promises[i] = new Promise((resolve, reject) => {
            axios.get(generateUrl + ids[i], {headers, params: {filterMode: "ALL"}}).then(response => {
                if (response.data) {
                    let data = buildDocumentRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio documents " + ids[i]});
                }
            }).catch(error => {
                reject({message: error, error: "Could not fetch Constellio documents: " + buildIdsParam(ids)});
            });
        });
    }
    return Promise.all(promises);
}


export const getDocumentSummary: getDocumentSummaryFunc = (authenticationObject: Authentication, id: string): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/documents/" + id;
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers}).then(response => {
            if (response.data) {
                let data = buildDocumentRecord(response.data);
                resolve(data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents " + id});
        });
    });
}

export const getDocumentsSummaries: getDocumentsSummariesFunc = (authenticationObject: Authentication, ids: string[]): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/documents/";
    let promises: Promise<any>[] = [];
    for (let i = 0; i < ids.length || 0; i++) {
        promises[i] = new Promise((resolve, reject) => {
            axios.get(generateUrl + ids[i], {headers}).then(response => {
                if (response.data) {
                    let data = buildDocumentRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio documents " + ids[i]});
                }
            }).catch(error => {
                reject({message: error, error: "Could not fetch Constellio documents: " + buildIdsParam(ids)});
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

const buildDocumentRecord = (record: Document): Document => {

    if (record.metadatas) {
        record.hasContent = (record.metadatas.hasContent && record.metadatas.hasContent[0] && record.metadatas.hasContent[0] === 'true') || false;
        record.modifiedOn = record.metadatas.modifiedOn && record.metadatas.modifiedOn[0];
        record.createdOn = record.metadatas.createdOn && record.metadatas.createdOn[0];
        record.title = record.metadatas.title && record.metadatas.title[0];
        record.content = record.metadatas.content && record.metadatas.content[0];
        record.filename = record.metadatas.filename && record.metadatas.filename[0];
        record.folder = record.metadatas.folder && record.metadatas.folder[0];
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