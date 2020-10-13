
//import {getCollections} from "constellio-sdk";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = (auth:{token: string, serviceKey:string, url:string}) => {
    return {}; //getCollections(auth);
};

export default {
    getPublicContent,
};