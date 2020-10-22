import React from 'react';

import FolderPrint from './record';
import RecordElement from "./recordElement";

interface RecordListProps{
    folders:Array<RecordElement>
};

export default function RecordList(Props:RecordListProps){
    let elements:any = [];
    if( Props.folders) {
         elements = Props.folders.map(item => (<FolderPrint folder={item}></FolderPrint>));
    }

    return (
        <div>
            {elements}
        </div>
    );
}