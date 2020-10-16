import axios from "axios";
import sinon = require("sinon");
import {API_VERSION} from "../../src/constant";
import {authenticate} from "../../src";
import {assert, expect } from "chai";
import {getSchema} from "../../src/services/SchemaService";
import {errorMonitor} from "events";

describe('getSchemas Tests', function () {
    const serverUrl = "http://localhost:7070/constellio";

    const collectionCode = `zeCollection`;
    const schemaCode = `document`;
    const generateTokenResponse = {data:`<?xml version="1.0" encoding="UTF-8"?><response><serviceKey>agent_admin</serviceKey><token>5362b9be-0e55-11eb-8583-b5cbb387177e</token></response>`};

    const getSchemaResponse = {data:{code:schemaCode, title:`Document`, metadatas:[{code:`title_s`, type:'string'},{code:`schema_s`, type:`string`}]}};

    let sandbox:any;

    beforeEach(()=>{
       sandbox = sinon.createSandbox();

    });
    afterEach(()=>{
        sandbox.restore();
    });

    it('should login with stubed server and test getSchemas', async ()=>{

        sandbox.stub(axios, 'get')
            .withArgs(`${serverUrl}/generateToken`, sinon.match.any).resolves(Promise.resolve(generateTokenResponse))
            .withArgs(`${serverUrl}/rest/v2/schemas/${collectionCode}/${schemaCode}`, sinon.match.any).resolves(Promise.resolve(getSchemaResponse));

        await testGetSchema();
    });

    it('should test getSchemas when realServer is healty.Else, the test is skipped', function(){

        this.timeout(0);

        return new Promise((resolve, reject)=>{
            verifyHealth()
                .catch(()=>this.skip())
                .then(async isHealty =>{
                    if(isHealty && isHealty.status === 204){
                        await testGetSchema();
                    }else{
                        this.skip();
                    }
                })
                .then(resolve)
                .catch(reject);
        })
    });

    const testGetSchema = async()=>{

        let authentication = await authenticate(
            {
                url: serverUrl,
                username: "admin",
                password: "password"
            });

        console.log(authentication);

        authentication.url = serverUrl;

        let schema = await getSchema(authentication, collectionCode, schemaCode);

        console.log(schema);
        expect(schema).to.not.equal(null);
        expect(schema).to.have.property('code').that.equals(schemaCode);
        expect(schema).to.have.property('title').that.is.not.undefined;
        expect(schema).to.have.property('metadatas').that.is.an('array').that.is.not.empty;
    }

    const verifyHealth = async () => {
        let localHostHealth = await axios.get("http://localhost:7070/constellio/rest/"+API_VERSION+"/health");
        return localHostHealth;
    }

    const onErrorFail = (error:any)=>{
        expect(error).to.have.property(`message`).that.is.not.undefined;
        assert.fail(error);
    }
});