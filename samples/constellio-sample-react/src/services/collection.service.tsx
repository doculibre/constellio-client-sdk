import {getCollections} from 'constellio-sdk/dist';
import {CONSTELLIO_URL} from "../config";

const getConstellioCollections = (token:string) => {
    //let folder = getFolder;

    return getCollections({token, url: CONSTELLIO_URL}).then((response:any) => {
        if (response) {
            return response;
        }
        else {return []};
    }).catch((error:any)=>{
        return [];
    });
};

export default {
    getConstellioCollections
};