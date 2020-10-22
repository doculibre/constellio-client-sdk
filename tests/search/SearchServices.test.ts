import {search} from '../../src/services/search/SearchService';
import {queryObject1} from './testQueryObject';
import {authenticate} from '../../src/services/authentication/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import axios from 'axios';
import {API_VERSION} from "../../src/constant";
import {searchFolders} from "../../src/services/search/SearchFolderService";
import {searchDocuments} from "../../src/services/search/SearchDocumentService";

describe('Search', function () {
    let sandbox: any;
    let server: any;
    let stubAuthenticate = {
        url: "",
        username: "",
        password: ""
    }
    let localHostHealth = false;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        server = sandbox.useFakeServer();
    });
    afterEach(() => {
        server.restore();
        sandbox.restore();
    });

    const verifyHealth = async (): Promise<any> => {
        let localHostHealth = await axios.get("http://localhost:7070/constellio/rest/" + API_VERSION + "/health");
        return localHostHealth;
    }

    it('should login with localhost when healthy and test search', function () {
        let testLocal = this;
        let url = "http://localhost:7070/constellio";
        verifyHealth().then((isHealthy) => {
            if (isHealthy && isHealthy.status === 204) {
                let testLogin = {
                    url,
                    username: "admin",
                    password: "password"
                };
                let result = authenticate(testLogin);
                result.then(function (auth) {
                    console.log(auth);
                    auth.url = url;
                    search(auth, queryObject1).then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
                        expect(data.results).to.not.equal(null);
                    }).catch(error => {
                        assert.fail(error);
                        expect(error).exist(error.message);
                    })
                }, function (error) {
                    assert.fail(error);
                    expect(error).exist(error.message);
                });
            } else {
                testLocal.skip();
            }
        }).catch((error) => {
                testLocal.skip();
            }
        );
    });

    it('should login with localhost when healthy and test search documents', function () {
        let testLocal = this;
        let url = "http://localhost:7070/constellio";
        verifyHealth().then((isHealthy) => {
            if (isHealthy && isHealthy.status === 204) {
                let testLogin = {
                    url,
                    username: "admin",
                    password: "password"
                };
                let result = authenticate(testLogin);
                result.then(function (auth) {
                    console.log(auth);
                    auth.url = url;
                    searchDocuments(auth, queryObject1).then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
                        expect(data.results).to.not.equal(null);
                        expect(data.results.length).to.equal(10);
                    }).catch(error => {
                        assert.fail(error);
                        expect(error).exist(error.message);
                    })
                }, function (error) {
                    assert.fail(error);
                    expect(error).exist(error.message);
                });
            } else {
                testLocal.skip();
            }
        }).catch((error) => {
                testLocal.skip();
            }
        );
    });

    it('should login with localhost when healthy and test search folders', function () {
        let testLocal = this;
        let url = "http://localhost:7070/constellio";
        verifyHealth().then((isHealthy) => {
            if (isHealthy && isHealthy.status === 204) {
                let testLogin = {
                    url,
                    username: "admin",
                    password: "password"
                };
                let result = authenticate(testLogin);
                result.then(function (auth) {
                    console.log(auth);
                    auth.url = url;
                    searchFolders(auth, queryObject1).then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
                        expect(data.results).to.not.equal(null);
                        expect(data.results.length).to.equal(1);
                    }).catch(error => {
                        assert.fail(error);
                        expect(error).exist(error.message);
                    })
                }, function (error) {
                    assert.fail(error);
                    expect(error).exist(error.message);
                });
            } else {
                testLocal.skip();
            }
        }).catch((error) => {
                testLocal.skip();
            }
        );
    });
});