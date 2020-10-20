import React from 'react';

import FolderPrint from './folder';
import FolderElement from './folderElement';

interface FolderListProps{
    folders:Array<FolderElement>
};

export default function FolderList(Props:FolderListProps){
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