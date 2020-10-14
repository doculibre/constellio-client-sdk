import {
    getDocument,
    getDocuments,
    getDocumentsSummaries,
    getDocumentSummary
} from '../../src/services/documents/DocumentService';
import {testDocument1, testDocument2, testDocument3} from './testDocumentsObjects'
import {authenticate} from '../../src/services/authentication/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import axios from 'axios';
import {API_VERSION} from "../../src/constant";
import {RecordReference} from "../../src/types/common/classes/record";

describe('Documents', function () {
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

    it('should login with localhost when healthy and test getDocument', function () {
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
                    getDocument(auth, "00000001").then(data => {
                        console.log(data);
                        expect(data).to.not.equal(null);
                        expect(data).to.not.equal(null);
                        expect(data).exist(data.title);
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

    it("should succeed on get documents with authentication", (done) => {
        const resolved = new Promise((r) => r({data: testDocument1}));
        sandbox.stub(axios, "get").returns(resolved);
        getDocument(stubAuthenticate, "00000001")
            .then((result) => {
                testResultSuccess(result, "documentTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should return error on failure get documents", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getDocument(stubAuthenticate, "00000001")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should succeed on get documents with authentication", (done) => {
        const resolved = new Promise((r) => r({data: [testDocument1, testDocument2, testDocument3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getDocuments(stubAuthenticate, ["00000001", "00000002", "00000003"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "documentTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should return error on failure get documents", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getDocuments(stubAuthenticate, ["00000001", "00000002", "00000003"])
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should succeed on get documents summary with authentication", (done) => {
        const resolved = new Promise((r) => r({data: testDocument1}));
        sandbox.stub(axios, "get").returns(resolved);
        getDocumentSummary(stubAuthenticate, "00000001")
            .then((result) => {

                testResultSuccess(result, "documentTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should return error on failure get documents summary", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getDocumentSummary(stubAuthenticate, "00000001")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should succeed on get documents summaries with authentication", (done) => {
        const resolved = new Promise((r) => r({data: [testDocument1, testDocument2, testDocument3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getDocumentsSummaries(stubAuthenticate, ["00000001", "00000002", "00000003"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "documentTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("should return error on failure get documents summaries", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getDocumentsSummaries(stubAuthenticate, ["00000001", "00000002", "00000003"])
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