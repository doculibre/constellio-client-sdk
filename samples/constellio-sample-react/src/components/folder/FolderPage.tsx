import React, {useState, useEffect} from "react";

import FolderService from "../../services/folder.service";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../types/user";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginInfo} from "../../types/LoginInfo";
import {getFolders} from "../../actions/folders";
import FolderList from "./folderList";

const FolderPage = (props: any) => {
    const { isLoggedIn } = useSelector<any,any>(state => state.auth);
    const [constellioElements, setConstellioElements] = useState([]);

    const auth = useSelector<any, any>(state => state.auth);
    const {token} = JSON.parse(auth.user || "{}");
    const {message} = useSelector<any, any>(state => state.message);


    useEffect(()=> {
        FolderService.getConstellioFolders(token, ["A01","A02", "A03"]).then(
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
                    <h3>Constellio Folders</h3>
                    <div>
                        <FolderList folders={constellioElements}></FolderList>
                    </div>
                </div>
            ) : (
                <h3>Constellio SAMPLE project</h3>
            )
            }
        </div>
    );
};

export default FolderPage;