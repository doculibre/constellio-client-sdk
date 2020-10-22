import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import logo from './Logo.png'

import { history } from "./components/helpers/history";
import {User} from "./types/user";
import { Dropdown } from "react-bootstrap";
import CollectionService from "./services/collection.service";
import FolderPage from "./components/folder/FolderPage";

const App = () => {

    const { user: currentUser } = useSelector<any,any>((state) => state.auth);
  const dispatch = useDispatch();


  const [collections, setCollections] = useState([]);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      let user = JSON.parse(currentUser || "{}");
      CollectionService.getConstellioCollections(user.token).then(
          (response: any) => {

            setCollections(response);
          },
          (error: any) => {
            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      )
    }
  }, []);

  const logOut = () => {
    dispatch(logout());
  };

  let options;
  if(collections){
    options = collections.map((coll:any) => {
         return  (<option value={coll.code || "no value"} label={coll.name || "no name"}></option>)
        }
    )
  }

  return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              <img src={logo} alt="Logo" />;
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="/home" className="nav-link">
                  Home
                </a>
              </li>
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/folders" className="nav-link">
                      Folders
                    </a>
                  </li>
                  <li className="nav-far-item">
                    <select className="nav-select" name="collections" id="collectionsConstellio">
                      {options}
                    </select>
                  </li>
                  <li className="nav-far-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-far-item ">
                    <a href="/login" className="nav-link" >
                      Login
                    </a>
                  </li>
                </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/folders" component={FolderPage} />
            </Switch>
          </div>
        </div>
      </Router>
  );
};

export default App;