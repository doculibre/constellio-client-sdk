import FacetValue from "./facet-value";
import Sort from "./sort";
import Record from "./record";
import {Authentication} from "./authentication";

export default class Query{
    sorts:Sort[];
    freeText:string;
    fieldFacets:string[];
    start:number;
    rows:number;
    collection:string
    constructor(collection:string);
}

export class AbstractQueryResults<T extends Record>{
    numFound:number;
    results:T[];
    facetResults:{key:string, value:FacetValue[]}[];
}

export class QueryResults extends AbstractQueryResults<Record>{    
}

export interface searchFunc {
    (authenticationObject: Authentication, query: Query, schemaTypes: string[]): Promise<QueryResults>
}