import React, {useState, useEffect} from "react";

import FolderService from "../services/folder.service";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../types/user";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginInfo} from "../types/LoginInfo";
import {getFolders} from "../actions/folders";
import FolderList from "./folder/folderList";
import {CONSTELLIO_URL} from "../config";
import {login} from "../actions/auth";
import {search} from "../actions/search";
import RecordList from "./record/recordList";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SearchObject {
    expression: string
}

const Home = (props: any) => {
    const {register, handleSubmit} = useForm<SearchObject>();

    const [loading, setLoading] = useState(false);
    const {isLoggedIn} = useSelector<any, any>(state => state.auth);
    const {results} = useSelector<any, any>(state => state.search || []);

    const auth = useSelector<any, any>(state => state.auth);
    const {token} = JSON.parse(auth.user || "{}");
    const {message} = useSelector<any, any>(state => state.message);

    const dispatch: any = useDispatch();


    const handleSearch = (searchObject: SearchObject) => {
        setLoading(true);

        dispatch(search(token, searchObject.expression))
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            {isLoggedIn ? (
                <div className="container">
                    <header className="jumbotron">

                    </header>
                    <h3>Constellio Search</h3>
                    <div className="form-group">
                        <form className="form-inline d-flex justify-content-center md-form form-sm" onSubmit={handleSubmit(handleSearch)}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="form-control form-control-sm mr-3 w-7"
                                    name="expression"
                                    ref={register({required: true})}
                                />
                            <button className="btn btn-primary" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <FontAwesomeIcon icon={faSearch} />
                            </button>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div>
                        <RecordList folders={results}></RecordList>
                    </div>
                </div>
            ) : (
                <h3>Constellio SAMPLE project</h3>
            )
            }
        </div>
    );
};

export default Home;