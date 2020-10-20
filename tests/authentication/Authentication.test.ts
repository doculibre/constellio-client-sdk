import {authenticate} from '../../src/services/authentication/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import {Authentication} from "../../src/types/common/classes/authentication";
import {API_VERSION} from "../../src/constant";

const axios = require('axios');

describe('authenticate', function () {
    let sandbox: any;
    let server: any;
    let stubLogin = {
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

    it('should login with localhost when healthy', function () {
        let testLocal = this;
        verifyHealth().then((isHealthy) => {
            if(isHealthy && isHealthy.status === 204) {
                let testLogin = {
                    url: "http://localhost:7070/constellio",
                    username: "admin",
                    password: "password"
                };
                let result = authenticate(testLogin);
                result.then(function (data) {
                    console.log(data);
                    expect(data).to.not.equal(null);
                    expect(data).exist(data.token);
                    expect(data).exist(data.serviceKey);
                }, function (error) {
                    assert.fail(error);
                    expect(error).exist(error.message);
                });
            }
            else{
                testLocal.skip();
            }
        }).catch((error) => {
            testLocal.skip();
            }
        );
    });

        it("on empty password, should return string", (done) => {
            const error = new Promise((r) => r({data:"Parameter 'password' required"}));
            sandbox.stub(axios, "get").returns(error);
            authenticate(stubLogin)
                .catch((error) => {
                    expect(error.message)
                        .to.equal("Parameter 'password' required");
                })
                .then(done, done);
            setTimeout(() => server.respond([200,
                {'Content-Type': 'application/json'}, '[]']), 0);
        });

    it("on empty username, should return string", (done) => {
        const error = new Promise((r) => r({data:"Parameter 'username' required"}));
        sandbox.stub(axios, "get").returns(error);
        authenticate(stubLogin)
            .catch((error) => {
                expect(error.message)
                    .to.equal("Parameter 'username' required")
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

        it('should display the data', (done) => {
            const data: String = "<response>\n" +
                "<serviceKey>agent_admin</serviceKey>" +
                "<token>b538e7fb-08cf-11eb-a794-45538ece1264</token>" +
                "</response>";
            const resolved = new Promise((r) => r({data}));
            sandbox.stub(axios, "get").returns(resolved);
            authenticate(stubLogin)
                .then((result) => {
                    expect(result.token)
                        .to.equal("b538e7fb-08cf-11eb-a794-45538ece1264");
                    expect(result.serviceKey)
                        .to.equal("agent_admin");
                })
                .then(done, done);
            setTimeout(() => server.respond([200,
                {'Content-Type': 'application/json'}, '[]']), 0);
        });
    });