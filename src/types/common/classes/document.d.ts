import Query, {AbstractQueryResults} from "./query";
import Record from "./record";
import {Authentication} from "./authentication";

export default class Document extends Record {
    createdOn?: string;
    modifiedOn?: string;
    hasContent: boolean;
    description?: string;
    folder?: string[];
    filename?: string;
    content?: string;
}

export class DocumentQueryResults extends AbstractQueryResults<Document> {
}

export interface getDocumentsFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Document[]>;
}

export interface getDocumentFunc {
    (authenticationObject: Authentication, id: string): Promise<Document>;
}

export interface getDocumentSummaryFunc {
    (authenticationObject: Authentication, id: string): Promise<Document>;
}

export interface getDocumentsSummariesFunc {
    (authenticationObject: Authentication, ids: string[]): Promise<Document[]>;
}

export interface searchDocumentsFunc {
    (authenticationObject: Authentication, query: Query): Promise<DocumentQueryResults>;
}