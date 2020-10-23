import {getDocuments} from 'constellio-sdk/dist';
import {CONSTELLIO_URL} from "../config";

const getConstellioDocuments = (token:string, ids:string[]) => {

    return getDocuments({token, url: CONSTELLIO_URL}, ids).then((response:any) => {
        if (response) {
            return response;
        }
        else {return []};
    }).catch((error:any)=>{
        return [];
    });
};

export default {
    getConstellioDocuments
};