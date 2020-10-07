import Query, { AbstractQueryResults } from "./query";
import Record from "./record";

export default class Document extends Record{
    record:Record

    constructor(record:Record)
}

export class DocumentQueryResults extends AbstractQueryResults<Document>{}

export function searchDocuments(query:Query):DocumentQueryResults

export function getDocument(id:string):Document
export function getDocuments(ids:string[]):Document[]

export function getDocumentSummary(id:string):Document
export function getDocumentsSummaries(ids:string[]):Document[]