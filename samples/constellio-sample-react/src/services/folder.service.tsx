import {getFolders} from 'constellio-sdk/dist';
import {CONSTELLIO_URL} from "../config";

const getConstellioFolders = (token:string, ids:string[]) => {
    //let folder = getFolder;

    return getFolders({token, url: CONSTELLIO_URL}, ids).then((response:any) => {
        if (response) {
            return response;
        }
        else {return []};
    }).catch((error:any)=>{
        return [];
    });
};

export default {
    getConstellioFolders
};