import {
    getRecordFunc,
    getRecordsFunc,
    getRecordsSummariesFunc,
    getRecordSummaryFunc
} from "../../types/common/services/constellio-service";
import {Authentication} from "../../types/common/classes/authentication";
import Record from "../../types/common/classes/record";

export const getRecord:getRecordFunc = (authenticationObject:Authentication, id:string):Promise<Record> => {
    let headers = buildConstellioAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/collections";
    const params = {
        serviceKey: authenticationObject.serviceKey
    };

    return new Promise<Record>((resolve, reject) => {

    });
}

export const getRecords:getRecordsFunc = (authenticationObject:Authentication, id:string[]):Promise<Record[]> => {
    let headers = buildConstellioAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/collections";
    const params = {
        serviceKey: authenticationObject.serviceKey
    };

    return new Promise<Record[]>((resolve, reject) => {

    });
}

export const getRecordSummary:getRecordSummaryFunc = (authenticationObject:Authentication, id:string):Promise<Record> => {
    let headers = buildConstellioAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/collections";
    const params = {
        serviceKey: authenticationObject.serviceKey
    };

    return new Promise<Record>((resolve, reject) => {

    });
}

export const getRecordsSummaries:getRecordsSummariesFunc = (authenticationObject:Authentication, ids:string[]):Promise<Record[]> => {
    let headers = buildConstellioAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/collections";
    const params = {
        serviceKey: authenticationObject.serviceKey
    };

    return new Promise<Record[]>((resolve, reject) => {

    });
}