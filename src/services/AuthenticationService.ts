const axios = require('axios');
import Login from "../type/common/authentication";

interface ErrorAuth {
    error: string,
    xhr: any,
    status: any,
    errorThrown: any
}

export const authenticate = async (authenticateObject: Login): Promise<any> => {

    const generateTokenUrl = authenticateObject.url + "/generateTeamsToken";
    let config ={
        method: 'post',
        url: generateTokenUrl,
        data: authenticateObject
    }
    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (data: any) {
                //let data:any = response.data;
                let error: any = data.getElementsByTagName("error");
                if (error && error.length > 0) {
                    reject({error: error.textContent});
                } else {
                    let tokenHtml: any = data.getElementsByTagName("token");
                    let serviceKeyHtml: any = data.getElementsByTagName("serviceKey")
                    if (tokenHtml.length > 0 && serviceKeyHtml.length > 0) {
                        let token: string = tokenHtml[0].textContent;
                        let serviceKey: string = serviceKeyHtml[0].textContent;
                        resolve({token: token, serviceKey: serviceKey});
                    } else {
                        reject({error: "no token sent"});
                    }
                }
            },)
            .catch(function (error: any) {
                reject({error});
            });
    });
}
