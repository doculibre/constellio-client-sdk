import {authenticate} from 'constellio-sdk/dist';

const login = (username:string, password:string, url:string) => {
    return authenticate({username, password, url})
        .then((response:any) => {
            if (response.token) {
                localStorage.setItem("user", JSON.stringify(response));
            }
            return response;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    login,
    logout
};