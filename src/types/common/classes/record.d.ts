import Query, {QueryResults} from "./query";
import {Authentication} from "./authentication";

export default class Record {
    id: string;
    schemaType: string;
    title: string;
    metadatas: any;
    administrativeUnit: RecordReference;
    category: RecordReference;
}

export class RecordReference {
    id: string;
    code: string;
    title: string;
    description?: string;
    parent?: RecordReference;
}

export interface getRecordFunc {
    (authenticationObject: Authentication, id: string): Promise<Record>;
}

export interface getRecordsFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Record[]>;
}

export interface getRecordSummaryFunc {
    (authenticationObject: Authentication, id: string): Promise<Record>;
}

export interface getRecordsSummariesFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Record[]>;
}