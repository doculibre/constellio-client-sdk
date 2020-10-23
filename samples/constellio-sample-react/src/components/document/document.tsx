import {useState} from "react";

import DocumentElement from './documentElement';
import React from "react";
import './document.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFolder, faQuestion} from "@fortawesome/free-solid-svg-icons";

interface DocumentListProps {
    document: DocumentElement
};

export default function DocumentPrint(props: DocumentListProps) {
    const [folded, setFolded] = useState(!props.document.schemaType);

    const fold = () => {
        setFolded(!folded);
    }

    const printMetadata = (document: any) => {
        if (document && document.metadatas) {
            return (<ul>
                {Object.keys(document.metadatas).map((keyName, i) => (
                    <li key={i}>
                        <span className="input-label"><b>{keyName}</b> : {document.metadatas[keyName]}</span>
                    </li>
                ))}
            </ul>);

        } else {
            return <div></div>
        }
    }

    const printIcon = (schemaType:string) => {
        if(schemaType && schemaType.includes("document")){
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
                    {printIcon(props.document.schemaType)}
                    {props.document.title || props.document.metadatas.title}
                    {folded ?
                        (<i className="pull-right glyphicon glyphicon-chevron-up"/>) :
                        (<i className="pull-right glyphicon glyphicon-chevron-down"/>)
                    }
                </div>
                <div className="panel-body" hidden={folded}>
                    {printMetadata(props.document)}
                </div>
                <div className="panel-footer">
                    <div className="btn-toolbar">
                        <span>{props.document.metadatas.parent}</span>
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