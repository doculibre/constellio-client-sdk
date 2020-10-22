import {Authentication} from "../../types/common/classes/authentication";
import Record, {
    getRecordFunc,
    getRecordsFunc,
    getRecordsSummariesFunc,
    getRecordSummaryFunc
} from "../../types/common/classes/record";
import {API_VERSION} from "../../constant";
import axios from "axios";

export const getRecord: getRecordFunc = async (authenticationObject: Authentication, id: string): Promise<Record> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers, params: {filterMode: "ALL", ids:id}})
            .then(function (response: any) {
                if (response.data) {
                    let data = buildRecordRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio records " + id});
                }
            }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio records " + id});
        });
    });
}

export const getRecords: getRecordsFunc = (authenticationObject: Authentication, ids: string[]): Promise<Record[]> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    let params = new URLSearchParams();
    for(let id of ids){
        params.append("ids", id);
    }
    params.append("filterMode", "ALL");
        return new Promise((resolve, reject) => {
            axios.get(generateUrl, {headers, params}).then(function (response: any) {
                if (response.data) {
                    let records:Record[] =response.data.map((record:Record)=>buildRecordRecord(record));
                    resolve(records);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio records " + buildIdsOutput(ids)});
                }
            }).catch(error => {
                reject({message: error, error: "Could not fetch Constellio records: " + buildIdsOutput(ids)});
            });
        });
}


export const getRecordSummary: getRecordSummaryFunc = (authenticationObject: Authentication, id: string): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers, params: { ids: id}})
            .then(function (response: any) {
                if (response.data) {
                    let data = buildRecordRecord(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio records " + id});
                }
            }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio records " + id});
        });
    });
}

export const getRecordsSummaries: getRecordsSummariesFunc = (authenticationObject: Authentication, ids: string[]): Promise<any> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    let params = new URLSearchParams();
    for(let id in ids){
        params.append("ids", id);
    }
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers, params}).then(function (response: any) {
            if (response.data) {
                let records:Record[] =response.data.map((record:Record)=>buildRecordRecord(record));
                resolve(records);
            } else {
                reject({message: response.data, error: "Could not fetch Constellio records " + buildIdsOutput(ids)});
            }
        }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio records: " + buildIdsOutput(ids)});
        });
    });
}

const buildAuthenticatedHeader = (token: string | undefined): any => {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

const buildIdsOutput = (ids: string[]): string => {
    return ids.join(",");
}

const buildRecordRecord = (record: Record): Record => {
    if (record.metadatas) {
        record.title = record.metadatas.title && record.metadatas.title[0];
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