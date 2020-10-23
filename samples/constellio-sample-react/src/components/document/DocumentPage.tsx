import React, {useState, useEffect} from "react";

import DocumentService from "../../services/document.service";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../types/user";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginInfo} from "../../types/LoginInfo";
import {getFolders} from "../../actions/folders";
import DocumentList from "./documentList";

const Document = (props: any) => {
    const { isLoggedIn } = useSelector<any,any>(state => state.auth);
    const [constellioElements, setConstellioElements] = useState([]);

    const auth = useSelector<any, any>(state => state.auth);
    const {token} = JSON.parse(auth.user || "{}");
    const {message} = useSelector<any, any>(state => state.message);


    useEffect(()=> {
        DocumentService.getConstellioDocuments(token, ["A01_numericDocumentWithSameCopy"]).then(
            (response: any) => {

                setConstellioElements(response);
            },
            (error: any) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setConstellioElements(_content);
            }
        )
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <div className="container">
                    <header className="jumbotron">

                    </header>
                    <h3>Constellio Documents</h3>
                    <div>
                        <DocumentList documents={constellioElements}></DocumentList>
                    </div>
                </div>
            ) : (
                <h3>Constellio SAMPLE project</h3>
            )
            }
        </div>
    );
};

export default Document;