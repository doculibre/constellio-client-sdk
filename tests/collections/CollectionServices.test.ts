import {getCollections} from '../../src/services/CollectionService';
import {authenticate} from '../../src/services/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import ConstellioCollection from "../../src/types/common/classes/constellio-collection";
import axios from 'axios';
import {API_VERSION} from "../../src/constant";

describe('Collections', function () {
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
        let localHostHealth = await axios.get("http://localhost:7070/constellio/rest/"+API_VERSION+"/health");
        return localHostHealth;
    }

    it('should login with localhost when healthy and test getCollection', function () {
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
                    getCollections(auth).then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).exist(data[0].code);
                        expect(data).exist(data[0].title);
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

    it("on get with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: [{}]}));
        sandbox.stub(axios, "get").returns(resolved);
        getCollections(stubAuthenticate)
            .then((result) => {
                expect(result)
                    .to.equal([]);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getCollections(stubAuthenticate)
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });
});