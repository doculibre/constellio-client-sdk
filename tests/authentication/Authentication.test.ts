
import * as Service from '../../src/services/AuthenticationService';
import { assert,expect } from 'chai';

describe('authenticate', function() {
    it('login', function () {
        let testLogin = {
            url: "http://localhost:7070/constellio",
            username: "admin",
            password: "password"
        };
        let result = Service.authenticate(testLogin);
        result.then(function (data) {
            console.log(data);
            expect(data).to.not.equal(null);
        }, function (error) {
            assert.fail(error);
        });
    });
});