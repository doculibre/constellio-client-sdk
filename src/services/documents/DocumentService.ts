import {Authentication} from "../../types/common/classes/authentication";
import {
    getDocumentsFunc,
    getDocumentFunc,
    getDocumentSummaryFunc,
    getDocumentsSummariesFunc
} from "../../types/common/services/constellio-service"
import axios from 'axios';
import Document from "../../types/common/classes/document";

export const getDocument: getDocumentFunc = (authenticationObject: Authentication, id: string): Promise<Document> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/documents";
    const params = {
        id,
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            if (response.data) {
                resolve(response.data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents " + id});
        });
    });
}

export const getDocuments: getDocumentsFunc = (authenticationObject: Authentication, ids: string[]): Promise<Document[]> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/documents";
    const params = {
        id: buildIdsParam(ids),
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let constellioDocuments: Document[] = [];
            if (response.data) {
                constellioDocuments.push(response.data);
                resolve(constellioDocuments);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents: " + buildIdsParam(ids)});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents: " + buildIdsParam(ids)});
        });
    });
}


export const getDocumentSummary: getDocumentSummaryFunc = (authenticationObject: Authentication, id: string): Promise<any> =>
{
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/documents";
    const params = {
        id,
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            if (response.data) {
                resolve(response.data);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents " + id});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents " + id});
        });
    });
}

export const getDocumentsSummaries: getDocumentsSummariesFunc = (authenticationObject: Authentication, ids: string[]): Promise<any> =>
{
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/documents";
    const params = {
        id: buildIdsParam(ids),
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let constellioDocuments: Document[] = [];
            if (response.data) {
                constellioDocuments.push(response.data);
                resolve(constellioDocuments);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio documents summaries: " + buildIdsParam(ids)});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio documents summaries: " + buildIdsParam(ids)});
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