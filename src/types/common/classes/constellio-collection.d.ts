import {Authentication} from "./authentication";

export default class ConstellioCollection{
    code:string;
    name:string;
    languages:string[];
}

interface getCollectionsFunc {
    (authenticationObject: Authentication): Promise<ConstellioCollection[]>;
}