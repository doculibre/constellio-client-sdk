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

export function getRecord(id: string): Record

export function getRecords(ids: string[]): Record[]

export function getRecordSummary(id: string): Record

export function getRecordsSummaries(ids: string[]): Record[]