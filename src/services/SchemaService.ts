import {getSchemaFunc} from "../types/common/services/constellio-service";
import {Authentication} from "../types/common/classes/authentication";
import axios from "axios";
import Schema from "../types/common/classes/schema";
import {parse} from "node-html-parser";
import Metadata from "../types/common/classes/metadata";

export const getSchema:getSchemaFunc = (authentication:Authentication, collection:string, schemaCode:string):Promise<Schema> => {
    const generateUrl = `${authentication.url}/getSchemaMetadatas?collection=${collection}&schema=${schemaCode}`;

    return new Promise((resolve, reject) => {
        axios.get(generateUrl).then(response => {
            let data: any = parse(response.data);
            let error: any = data.querySelector("error");
            if (error && error.length > 0) {
                reject({error: error.textContent});
            }else{
                let schemaRoot:HTMLElement = data.querySelector("schema");

                let schema:Schema = {
                    code:   schemaRoot.getAttribute("code") ?? "",
                    title: schemaRoot.getAttribute("label") ?? "",
                    metadatas: data.querySelectorAll("metadata").map((metadataHTMLElement:HTMLElement)=>{

                        const metadata:Metadata = {
                          code:metadataHTMLElement.getAttribute("code") ?? "",
                          type:metadataHTMLElement.getAttribute("type") ?? ""
                        }

                        return metadata;
                    })
                };

                resolve(schema);
            }
        }).catch(error => {
            reject({message:error, error:`Could not fetch Schema ${schemaCode} for collection ${collection}`});
        });
    });
}