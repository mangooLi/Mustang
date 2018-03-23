import "reflect-metadata";
import {JsonConfigurationManager} from "../src/configuration/JsonConfigurationManager";
import {RedisSection} from "../src/configuration/RedisSection";
import {expect} from "chai";
import "mocha";
import {JsonWebTokenSection} from "../src/configuration/JsonWebTokenSection";
import {MongoDbSection} from "../src/configuration/MongoDbSection";

describe('getConfig', () => {
    let config: JsonConfigurationManager;

    before(async () => config = new JsonConfigurationManager());

    it('get string config', () => {
        const result = config.getStringValue('redis.host');
        expect(result).to.equal('localhost');
    });

    it('get number config', () => {
        const result = config.getNumberValue('redis.port');
        expect(result).to.equals(6379);
    });

    it('get boolean config', () => {
        const result = config.getBooleanValue('redis.tls');
        expect(result).to.eq(false);
    });

    it('get redisSection config', () => {
        const result = config.getSection<RedisSection>('redis');
        expect(result.host).to.equals('localhost');
        expect(result.port).to.equals(6379);
        expect(result.db).to.undefined;
        expect(result.password).to.undefined;
    });

    it('get jwtSection config', () => {
        const result = config.getSection<JsonWebTokenSection>('jwt');
        expect(result.secret).to.equals('development');
        expect(result.expire).to.equals(600000);
        expect(result.aud).to.equals('test.vip56.cn');
    });

    it('get mongoDbSection config', () => {
        const result = config.getSection<MongoDbSection>('mongodb');
        expect(result.connection).to.equals('mongodb://localhost/test');
    });
});