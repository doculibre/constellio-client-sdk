import FacetValue from "./facet-value";
import Sort from "./sort";
import Record from "./record";
import {Authentication} from "./authentication";

export default class Query{
    collection:string;
    schemaTypes:string[];
    sorting:Sort[];
    facetMode:number;
    expression:string;
    rowsStart?:number;
    rowsLimit?:number;
    requireWriteAccess:boolean;
}

export class AbstractQueryResults<T extends Record>{
    numFound:number;
    results:T[];
    facetResults?:{key:string, value:FacetValue[]}[];
}

export class QueryResults extends AbstractQueryResults<Record>{    
}

export interface searchFunc {
    (authenticationObject: Authentication, query: Query): Promise<QueryResults>
}