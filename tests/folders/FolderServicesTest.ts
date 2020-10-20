import {getFolder, getFolders, getFoldersSummaries, getFolderSummary} from '../../src/services/folders/FolderService';
import {testFolder1, testFolder2, testFolder3} from './testFoldersObjects';
import {authenticate} from '../../src/services/authentication/AuthenticationService';
import {assert, expect} from 'chai';
import sinon = require('sinon');
import axios from 'axios';
import {API_VERSION} from "../../src/constant";

describe('Folders', function () {
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

    it('should login with localhost when healthy and test getfolder', function () {
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
                    getFolder(auth, "A01").then(data => {
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

    it('should login with localhost when healthy and test getFolders', function () {
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
                    getFolders(auth, ["A01", "A02"]).then(data => {
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

    it("on get folders with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: testFolder1}));
        sandbox.stub(axios, "get").returns(resolved);
        getFolder(stubAuthenticate, "A01")
            .then((result) => {
                testResultSuccess(result, "folderTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get folders, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getFolder(stubAuthenticate, "A01")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get folders with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: [testFolder1,testFolder2,testFolder3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getFolders(stubAuthenticate, ["A01", "A02", "A03"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "folderTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get folders, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getFolders(stubAuthenticate, ["A01", "A02", "A03"])
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get folders summary with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: testFolder1}));
        sandbox.stub(axios, "get").returns(resolved);
        getFolderSummary(stubAuthenticate, "A01")
            .then((result) => {
                testResultSuccess(result, "folderTest1", "AA01");
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get folders summary, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getFolderSummary(stubAuthenticate, "A01")
            .catch((error) => {
                expect(error.message)
                    .to.equal(null);
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on get folders summaries with authentication, should succeed", (done) => {
        const resolved = new Promise((r) => r({data: [testFolder1,testFolder2,testFolder3]}));
        sandbox.stub(axios, "get").returns(resolved);
        getFoldersSummaries(stubAuthenticate, ["A01", "A02", "A03"])
            .then((results) => {
                let i = 0;
                for (let result in results) {
                    i++;
                    testResultSuccess(result, "folderTest" + i, "AA0" + i);
                }
            })
            .then(done, done);
        setTimeout(() => server.respond([200,
            {'Content-Type': 'application/json'}, '[]']), 0);
    });

    it("on failure get folders summaries, should return error", (done) => {
        const error = new Promise((r) => r({data: null}));
        sandbox.stub(axios, "get").returns(error);
        getFoldersSummaries(stubAuthenticate, ["A01", "A02", "A03"])
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