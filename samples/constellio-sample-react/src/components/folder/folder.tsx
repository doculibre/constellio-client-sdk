import {useState} from "react";

import FolderElement from './folderElement';
import React from "react";
import './folder.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFolder, faQuestion} from "@fortawesome/free-solid-svg-icons";

interface RuleListProps {
    folder: FolderElement
};

export default function RulePrint(props: RuleListProps) {
    const [folded, setFolded] = useState(!props.folder.schemaType);

    const fold = () => {
        setFolded(!folded);
    }

    const printMetadata = (folder: any) => {
        if (folder && folder.metadatas) {
            return (<ul>
                {Object.keys(folder.metadatas).map((keyName, i) => (
                    <li key={i}>
                        <span className="input-label"><b>{keyName}</b> : {folder.metadatas[keyName]}</span>
                    </li>
                ))}
            </ul>);

        } else {
            return <div></div>
        }
    }

    const printIcon = (schemaType:string) => {
        if(schemaType && schemaType.includes("folder")){
            return <FontAwesomeIcon className="fa-record" icon={faFolder} />
        }
        else if(schemaType && schemaType.includes("document")){
            return <FontAwesomeIcon className="fa-record" icon={faFile} />
        }
        else{

            return <FontAwesomeIcon className="fa-record" icon={faQuestion} />
        }
    }

    return (
        <div>
            <div className="panel panel-primary">
                <div className="panel-heading display-hand" role="presentation" onClick={fold}>
                    {printIcon(props.folder.schemaType)}
                    {props.folder.title || props.folder.metadatas.title}
                    {folded ?
                        (<i className="pull-right glyphicon glyphicon-chevron-up"/>) :
                        (<i className="pull-right glyphicon glyphicon-chevron-down"/>)
                    }
                </div>
                <div className="panel-body" hidden={folded}>
                    {printMetadata(props.folder)}
                </div>
                <div className="panel-footer">
                    <div className="btn-toolbar">
                        <span>{props.folder.metadatas.parent}</span>
                        <div className="btn-group btn-group-xs pull-right">
                            <button className="btn btn-primary" title="Update">
                                <i className="glyphicon glyphicon-pencil"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}