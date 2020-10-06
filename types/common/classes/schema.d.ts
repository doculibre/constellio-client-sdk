import Metadata from "./metadata";

export default class Schema{
    code:string;
    title:string;
    metadatas:Metadata[];
}

export function getSchema(collection:string, schemaCode:string):Schema