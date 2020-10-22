import {Authentication} from "../../types/common/classes/authentication";
import Query,{QueryResults,searchFunc} from "../../types/common/classes/query"
import axios from 'axios';
import {API_VERSION} from "../../constant";
import Record from "../../types/common/classes/record";

export const search: searchFunc = async  (authenticationObject: Authentication, query: Query): Promise<QueryResults> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    return new Promise((resolve, reject) => {
        axios.post(generateUrl, query,{headers, params: {filterMode: "ALL"}})
            .then(function (response: any) {
                if (response.data && response.data.records) {
                    let data = baseRecordResponseConvert(response.data);
                    resolve(data);
                } else {
                    reject({message: response.data, error: "Could not search Constellio records " + query.expression});
                }
            }).catch(error => {
            reject({message: error, error: "Could not search Constellio records " + query.expression});
        });
    });
}

const buildAuthenticatedHeader = (token: string | undefined): any => {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

const baseRecordResponseConvert = (response:any):QueryResults => {
    let result:QueryResults = {facetResults: [], numFound: 0, results: []};
    result.results = buildRecordFromResult(response.records);
    result.numFound = result.results.length;
    result.facetResults = response.facets;
    return result;
}

const buildRecordFromResult = (records:any[]):Record[] =>{

    let results:Record[] = [];
    for(let record of records){
        let result:Record ={
            administrativeUnit: record.metadatas && record.metadatas.administrativeUnit,
            category: (record.metadatas && record.metadatas.category),
            id: record.metadatas.id || "",
            metadatas: record.metadatas,
            schemaType: record.schemaType,
            title: record.metadatas.title || record.metadatas.name || "",
        }
        results.push(result);
    }
    return results;
}
