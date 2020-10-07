const axios = require('axios');
import Login from "../types/common/classes/authentication";
import {parse} from 'node-html-parser';

export const authenticate = async (authenticateObject: Login): Promise<any> => {

    const generateTokenUrl = authenticateObject.url + "/generateToken";
    const params = {
        username: authenticateObject.username,
        password: authenticateObject.password,
        duration: authenticateObject.duration || "1h"
    }

    return new Promise((resolve, reject) => {
        axios.get(generateTokenUrl, {params})
            .then(function (response: any) {
                let data: any = parse(response.data);
                let error: any = data.querySelector("error");
                if (error && error.length > 0) {
                    reject({error: error.textContent});
                } else {
                    let tokenHtml: HTMLElement = data.querySelector("token");
                    let serviceKeyHtml: HTMLElement = data.querySelector("serviceKey");
                    if (tokenHtml && serviceKeyHtml) {
                        let token: string = tokenHtml.innerText;
                        let serviceKey: string = serviceKeyHtml.innerText;
                        resolve({token: token, serviceKey: serviceKey});
                    } else {
                        reject({
                            error: "no token sent",
                            message: response.data
                        });
                    }
                }
            },)
            .catch(function (error: any) {
                reject({error});
            });
    });
}
