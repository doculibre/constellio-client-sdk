import axios from "axios";
import sinon = require("sinon");
import {API_VERSION} from "../../src/constant";
import {authenticate} from "../../src";
import {assert, expect } from "chai";
import {getSchema} from "../../src/services/schemas/SchemaService";

describe('getSchemas Tests', function () {
    const serverUrl = "http://localhost:7070/constellio";

    const collectionCode = `zeCollection`;
    const schemaCode = `document_default`;
    const generateTokenResponse = {data:`<?xml version="1.0" encoding="UTF-8"?><response><serviceKey>agent_admin</serviceKey><token>5362b9be-0e55-11eb-8583-b5cbb387177e</token></response>`};

    const getSchemaResponse = {data:
`<?xml version="1.0" encoding="UTF-8"?>
<schema code="document_default" collection="zeCollection" label="Document">
    <metadata code="actualDepositDate" title="Date de versement réelle" multivalue="false" type="DATE" solr-field="actualDepositDate_da" label="Date de versement réelle"/>
    <metadata code="actualDepositDateEntered" title="Date de conservation actuelle entrée" multivalue="false" type="DATE" solr-field="actualDepositDateEntered_da" label="Date de conservation actuelle entrée"/>
    <metadata code="actualDestructionDate" title="Date de destruction réelle" multivalue="false" type="DATE" solr-field="actualDestructionDate_da" label="Date de destruction réelle"/>
</schema>
`};

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
            .withArgs(`${serverUrl}/getSchemaMetadatas?collection=${collectionCode}&schema=${schemaCode}`).resolves(Promise.resolve(getSchemaResponse));

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