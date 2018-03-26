import "reflect-metadata";
import {JsonConfigurationManager} from "../src/configuration/JsonConfigurationManager";
import {RedisSection} from "../src/configuration/RedisSection";
import {expect} from "chai";
import "mocha";
import {JsonWebTokenSection} from "../src/configuration/JsonWebTokenSection";
import {MongoDbSection} from "../src/configuration/MongoDbSection";

describe('getConfig', () => {
    let config: JsonConfigurationManager;
    let testValue: any;

    before(async () => {
        config = new JsonConfigurationManager();
        testValue = {
            redis: {
                host: 'localhost',
                port: 6379,
                tls: false
            },
            jwt: {
                secret: 'development',
                expire: 600000,
                aud: 'test.vip56.cn'
            },
            mongodb: {
                connection: 'mongodb://localhost/test'
            }
        }
    });

    it('get string config', () => {
        const result = config.getStringValue('redis.host');
        expect(result).to.equal(testValue.redis.host);
    });

    it('get number config', () => {
        const result = config.getNumberValue('redis.port');
        expect(result).to.equals(testValue.redis.port);
    });

    it('get boolean config', () => {
        const result = config.getBooleanValue('redis.tls');
        expect(result).to.eq(testValue.redis.tls);
    });

    it('get redisSection config', () => {
        const result = config.getSection<RedisSection>('redis');
        expect(result.host).to.equals(testValue.redis.host);
        expect(result.port).to.equals(testValue.redis.port);
        expect(result.db).to.undefined;
        expect(result.password).to.undefined;
    });

    it('get jwtSection config', () => {
        const result = config.getSection<JsonWebTokenSection>('jwt');
        expect(result.secret).to.equals(testValue.jwt.secret);
        expect(result.expire).to.equals(testValue.jwt.expire);
        expect(result.aud).to.equals(testValue.jwt.aud);
    });

    it('get mongoDbSection config', () => {
        const result = config.getSection<MongoDbSection>('mongodb');
        expect(result.connection).to.equals(testValue.mongodb.connection);
    });
});