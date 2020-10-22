import {useState} from "react";

import RecordElement from './recordElement';
import React from "react";
import './record.css';

interface RuleListProps {
    folder: RecordElement
};

export default function RecordPrint(props: RuleListProps) {
    const [folded, setFolded] = useState(!props.folder.schemaType);

    const fold = () =>{
        setFolded(!folded);
    }

    return (
        <div>
            <div className="panel panel-primary">
                <div className="panel-heading display-hand" role="presentation" onClick={fold}>
                    {props.folder.title || props.folder.metadatas.title}
                    {folded ?
                        (<i className="pull-right glyphicon glyphicon-chevron-up" />) :
                        (<i className="pull-right glyphicon glyphicon-chevron-down" />)
                    }
                </div>
                <div className="panel-body" hidden={folded}>
                    <p>{props.folder.schemaType|| props.folder.metadatas.schemaType}</p>
                    <p>{props.folder.metadatas.description && props.folder.metadatas.description}</p>
                </div>
                <div className="panel-footer">
                    <div className="btn-toolbar">
                        <span>{props.folder.metadatas.parent}</span>
                        <div className="btn-group btn-group-xs pull-right">
                            <button className="btn btn-primary" title="Update">
                                <i className="glyphicon glyphicon-pencil" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}