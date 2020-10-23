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
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SearchObject {
    expression: string,
    recordc: string,
    order: string,
    facetSelect: string[],
    sort: string,
}

const Home = (props: any) => {
    const {register, handleSubmit} = useForm<SearchObject>();

    const [loading, setLoading] = useState(false);
    const {isLoggedIn} = useSelector<any, any>(state => state.auth);
    const {results, facets} = useSelector<any, any>(state => state.search || []);

    const auth = useSelector<any, any>(state => state.auth);
    const {token} = JSON.parse(auth.user || "{}");
    const {message} = useSelector<any, any>(state => state.message);

    const dispatch: any = useDispatch();


    const handleSearch = (searchObject: SearchObject) => {
        setLoading(true);

        let schema = [];
        if (searchObject.recordc !== "all") {
            schema.push(searchObject.recordc);
        }

        let sorts: any[] = [];
        if (searchObject.sort && searchObject.sort !== "") {
            sorts.push({
                metadata: searchObject.sort,
                ascending: searchObject.order!=="descending",
            });
        }

        dispatch(search(token, searchObject.expression, schema, sorts, searchObject.facetSelect))
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const getAllCategories = (facets: any): string[] => {
        let categories = [];
        for (let facet of facets) {
            if (facet.category) {
                for (let cat of facet.category) {
                    if (categories.indexOf(cat) === -1) {
                        categories.push(cat);
                    }
                }
            }
        }
        return categories;
    }

    const createFacets = () => {
        if (facets) {
            return (<div className="panel panel-primary">
                    <div className="panel panel-secondary">
                        <h3>Sort Order</h3>
                        <select className="nav-select" name="sort" id="facetsConstellio" ref={register}>
                            <option value="title">Title</option>
                            <option value="createdOn">Date created</option>
                        </select>
                        <label className="radio-inline" htmlFor="increase">
                            <input type="radio" id="ascending" name="order" value="ascending" defaultChecked
                                   ref={register}/> Ascending order</label>
                        <label className="radio-inline" htmlFor="folders">
                            <input type="radio" id="descending" name="order" value="descending"
                                   ref={register}/> Descending order</label>
                    </div>
                {facets.map((facet: any) => { return (

                    <div className="panel panel-secondary">
                        <h3>{facet.facetName}</h3>
                        <ul>
                            {facet.values && facet.values.map((val: any) => {
                                return (
                                    <li key={val.name}>
                                        <label><input type="checkbox" name="facetSelect" value={val.id}
                                                      ref={register}/> {val.name} ({val.count})</label>
                                    </li>);
                            })}
                        </ul>
                    </div>
                    );
                })}
                </div>
            )
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <div className="container">
                    <header className="jumbotron">

                    </header>
                    <h3>Constellio Search</h3>
                    <div className="form-group">
                        <form className="form-inline d-flex justify-content-center md-form form-sm"
                              onSubmit={handleSubmit(handleSearch)}>
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
                                <FontAwesomeIcon icon={faSearch}/>
                            </button>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}<br/><br/>
                            <label className="radio-inline" htmlFor="all">
                                <input type="radio" id="all" name="recordc" value="all" ref={register}
                                       defaultChecked/> All</label>
                            <label className="radio-inline" htmlFor="documents">
                                <input type="radio" id="document" name="recordc" value="document"
                                       ref={register}/> Documents</label>
                            <label className="radio-inline" htmlFor="folders">
                                <input type="radio" id="folder" name="recordc" value="folder"
                                       ref={register}/> Folders</label>
                            <br/>
                            <div className="float-right">
                                {createFacets()}
                            </div>
                        </form>
                    </div>

                    <div className="float-left">
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