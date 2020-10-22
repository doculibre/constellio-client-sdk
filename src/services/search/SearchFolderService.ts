import {Authentication} from "../../types/common/classes/authentication";
import Folder, {FolderQueryResults, searchFoldersFunc} from "../../types/common/classes/folder";
import Query, {QueryResults, searchFunc} from "../../types/common/classes/query"
import axios from 'axios';
import {API_VERSION} from "../../constant";
import {buildFolderRecord} from "../folders/FolderService";


export const searchFolders: searchFoldersFunc = async (authenticationObject: Authentication, query: Query): Promise<FolderQueryResults> => {
    query.schemaTypes = ['folder'];
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/records";
    return new Promise((resolve, reject) => {
        axios.post(generateUrl, query, {headers, params: {filterMode: "ALL"}})
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

const baseRecordResponseConvert = (response: any): FolderQueryResults => {
    let result: FolderQueryResults = {facetResults: [], numFound: 0, results: []};
    result.results = buildRecordFromResult(response.records);
    result.numFound = result.results.length;
    result.facetResults = response.facets;
    return result;
}

const buildRecordFromResult = (records: any[]): Folder[] => {

    let results: Folder[] = [];
    for (let record of records) {
        let result:Folder = buildFolderRecord(record);
        results.push(result);
    }
    return results;
}

const buildAuthenticatedHeader = (token: string | undefined): any => {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}