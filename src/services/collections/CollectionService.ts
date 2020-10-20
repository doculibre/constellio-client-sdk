import  { Authentication } from "../../types/common/classes/authentication";
import ConstellioCollection,{getCollectionsFunc} from "../../types/common/classes/constellio-collection";
import ConstellioService from "../../types/common/services/constellio-service";
import Login from "../../types/common/classes/authentication";
import axios from 'axios';
import {API_VERSION} from "../../constant";

export const getCollections:getCollectionsFunc = (authenticationObject:Authentication):Promise<ConstellioCollection[]> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/"+API_VERSION+"/collections";
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {headers}).then(response => {
            if (response.data) {
                resolve(response.data);
            } else {
                reject({message:response.data, error:"Could not fetch Constellio collections"});
            }
        }).catch(error => {
            reject({message:error, error:"Could not fetch Constellio collections"});
        });
    });
}

const buildAuthenticatedHeader = (token:string | undefined) =>{

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}