import {getSchemaFunc} from "../types/common/services/constellio-service";
import {Authentication} from "../types/common/classes/authentication";
import axios from "axios";
import Schema from "../types/common/classes/schema";

export const getSchema:getSchemaFunc = (authentication:Authentication, collection:string, schemaCode:string):Promise<Schema> => {
    let headers = buildAuthenticatedHeader(authentication.token);

    const generateUrl = `${authentication.url}/rest/v2/schemas/${collection}/${schemaCode}`;
    const params = {
        serviceKey: authentication.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let schema: Schema;
            if (response.data) {
                schema = response.data;
                resolve(schema);
            } else {
                reject({message:response.data, error:`Could not fetch Schema ${schemaCode} for collection ${collection}`});
            }
        }).catch(error => {
            reject({message:error, error:`Could not fetch Schema ${schemaCode} for collection ${collection}`});
        });
    });
}

const buildAuthenticatedHeader = (token:string | undefined) =>{

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}