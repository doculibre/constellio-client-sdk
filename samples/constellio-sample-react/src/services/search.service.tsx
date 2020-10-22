import {search} from 'constellio-sdk/dist';
import {CONSTELLIO_URL} from "../config";

const searchConstellio = (token:string, query:any) => {
    return search({token, url: CONSTELLIO_URL}, query).then((response:any) => {
        if (response) {
            return response;
        }
        else {return []};
    }).catch((error:any)=>{
        return [];
    });
};

export default {
    searchConstellio
};