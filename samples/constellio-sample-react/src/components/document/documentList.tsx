import React from 'react';

import DocumentElement from './documentElement';

import DocumentPrint from './document';

interface DocumentListProps{
    documents:Array<DocumentElement>
};

export default function DocumentList(Props:DocumentListProps){
    let elements:any = [];
    if(Props.documents) {
         elements = Props.documents.map(item => (<DocumentPrint document={item}></DocumentPrint>));
    }

    return (
        <div>
            {elements}
        </div>
    );
}