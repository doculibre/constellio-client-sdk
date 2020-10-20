import ConstellioCollection from "../classes/constellio-collection";
import { DocumentQueryResults } from "../classes/document";
import Folder, { FolderQueryResults } from "../classes/folder";
import Query, { QueryResults } from "../classes/query";
import Record from "../classes/record"
import Schema from "../classes/schema";
import Login, {Authentication} from "../classes/authentication";

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

export interface getCollectionsFunc {
    (authenticationObject: Authentication): Promise<ConstellioCollection[]>;
}

interface authenticateFunc {
    (authenticateObject: Login): Promise<any>;
}

interface getSchemaFunc {
    (authenticationObject: Authentication, collection:string, schemaCode:string): Promise<Schema>;
}

export default class ConstellioService{
    static authenticate(authenticateObject: Login):Promise<any>
    static getCollections():ConstellioCollection[]

    static search(query: Query, schemaTypes: string[]): QueryResults

    static searchDocuments(query: Query): DocumentQueryResults

    static getDocument(id: string): Document

    static getDocuments(ids: string[]): Document[]

    static getDocumentSummary(id: string): Document

    static getDocumentsSummaries(ids: string[]): Document[]

    static searchFolders(query: Query): FolderQueryResults

    static getFolder(id: string): Folder

    static getFolders(ids: string[]): Folder[]

    static getFolderSummary(id: string): Folder

    static getFoldersSummaries(ids: string[]): Folder[]

    static getRecord(id: string): Record

    static getRecords(ids: string[]): Record[]

    static getRecordSummary(id: string): Record

    static getRecordsSummaries(ids: string[]): Record[]

    static getSchema(collection: string, schemaCode: string): Schema
}