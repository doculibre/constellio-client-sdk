import {getRecord, getRecords, getRecordsSummaries, getRecordSummary} from '../../src/services/records/RecordService';
import {testRecord1, testRecord2, testRecord3} from './testRecordsObjects';
import {authenticate} from '../../src/services/authentication/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import axios from 'axios';
import {API_VERSION} from "../../src/constant";

describe('Records', function () {
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

    it('should login with localhost when healthy and test getRecord', function () {
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
                    getRecord(auth, "A01").then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
                        expect(data.title).to.not.equal(null);
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

    it('should login with localhost when healthy and test getRecords', function () {
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
                    getRecords(auth, ["A01", "A02"]).then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
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

    it("on get records with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: testRecord1}));
        sandbox.stub(axios, "get").returns(resolved);
        getRecord(stubAuthenticate, "A01")
            .then((result) => {
                testResultSuccess(result, "recordTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get records, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getRecord(stubAuthenticate, "A01")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get records with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: [testRecord1,testRecord2,testRecord3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getRecords(stubAuthenticate, ["A01", "A02", "A03"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "recordTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get records, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getRecords(stubAuthenticate, ["A01", "A02", "A03"])
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get records summary with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: testRecord1}));
        sandbox.stub(axios, "get").returns(resolved);
        getRecordSummary(stubAuthenticate, "A01")
            .then((result) => {
                testResultSuccess(result, "recordTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get records summary, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getRecordSummary(stubAuthenticate, "A01")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get records summaries with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: [testRecord1,testRecord2,testRecord3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getRecordsSummaries(stubAuthenticate, ["A01", "A02", "A03"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "recordTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get records summaries, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getRecordsSummaries(stubAuthenticate, ["A01", "A02", "A03"])
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });
});

const testResultSuccess = (result: any, title: string, adminUnitName: string) => {
    expect(result).to.not.equal(null);
    expect(result.title).equal(title);
    expect(result.administrativeUnit.title).equal(adminUnitName);
}