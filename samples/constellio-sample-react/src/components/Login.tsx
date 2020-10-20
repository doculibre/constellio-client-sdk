import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {useForm} from "react-hook-form";

import {login} from "../actions/auth";
import {LoginInfo} from "../types/LoginInfo";
import {CONSTELLIO_URL} from "../config";

const Login = (props: any) => {
    const {register, handleSubmit} = useForm<LoginInfo>()

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector<any,any>(state => state.auth);
    const { message } = useSelector<any,any>(state => state.message);

    const dispatch: any = useDispatch();


    const handleLogin = (info: LoginInfo) => {

        setLoading(true);

        dispatch(login(info.username, info.password, info.url))
            .then(() => {
                props.history.push("/home");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/home"/>;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-group">
                        <label htmlFor="url">url Constellio</label>
                        <input
                            type="hidden"
                            className="form-control"
                            name="url"
                            ref={register({required: true})}
                            value={CONSTELLIO_URL}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            ref={register({required: true})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            ref={register({required: true})}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;