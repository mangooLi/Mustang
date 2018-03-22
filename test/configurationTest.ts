import "reflect-metadata";
import {JsonConfigurationManager} from "../src/configuration/JsonConfigurationManager";
import {expect} from "chai";
import "mocha";

describe('getConfig', () => {
    let configs: JsonConfigurationManager;

    before(async () => configs = new JsonConfigurationManager());

    it('get string config', () => {
        const result = configs.getStringValue('connectionString');
        expect(result).to.equal('localhost');
    });
});