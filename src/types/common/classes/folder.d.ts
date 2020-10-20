import Query, {AbstractQueryResults} from "./query";
import Record from "./record";
import {Authentication} from "./authentication";

export default class Folder extends Record {
    createdOn?:string;
    modifiedOn?:string;
    hasContent:boolean;
    description?:string;
}

export class FolderQueryResults extends AbstractQueryResults<Folder> {
}

export interface getFolderFunc {
    (authenticationObject: Authentication, id: string): Promise<Folder>;
}

export interface getFoldersFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Folder[]>;
}

export interface getFolderSummaryFunc {
    (authenticationObject: Authentication, id: string): Promise<Folder>;
}

export interface getFoldersSummariesFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Folder[]>;
}

export interface searchFoldersFunc {
    (authenticationObject: Authentication, query: Query): Promise<FolderQueryResults>;
}