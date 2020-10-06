import Query, { AbstractQueryResults } from "./query";
import Record from "./record";

export default class Folder extends Record{
    record:Record;

    constructor(record:Record);
}

export class FolderQueryResults extends AbstractQueryResults<Folder>{}

export function searchFolders(query:Query):FolderQueryResults

export function getFolder(id:string):Folder
export function getFolders(ids:string[]):Folder[]

export function getFolderSummary(id:string):Folder
export function getFoldersSummaries(ids:string[]):Folder[]
