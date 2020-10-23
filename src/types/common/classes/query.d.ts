import FacetValue from "./facet-value";
import Sort from "./sort";
import Record from "./record";
import {Authentication} from "./authentication";

export default class Query{
    collection:string;
    schemaTypes:string[];
    sorting:Sort[];
    facetMode?:FacetMode;
    expression:string;
    facetValueIds:string[];
    rowsStart?:number;
    rowsLimit?:number;
    requireWriteAccess:boolean;
}

export enum FacetMode{
    NONE, CONSTELLIO, SPECIFIC
}

export class AbstractQueryResults<T extends Record>{
    numFound:number;
    results:T[];
    facetResults?:{facetId:string, facetName:string, values:FacetValue[]}[];
}

export class QueryResults extends AbstractQueryResults<Record>{    
}

export interface searchFunc {
    (authenticationObject: Authentication, query: Query): Promise<QueryResults>
}