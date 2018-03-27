import "reflect-metadata";
import {JsonConfigurationManager} from "../src/configuration/JsonConfigurationManager";
import {expect} from "chai";
import "mocha";
import {RedisSection} from "../src/configuration/RedisSection";
import {JsonWebTokenSection} from "../src/configuration/JsonWebTokenSection";
import {MongoDbSection} from "../src/configuration/MongoDbSection";
import {RetrySection} from "../src/configuration/RetrySection";

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
            },
            retry: {
                cacheRetries: 2,
                cacheFactor: 2,
                cacheMinTimeout: 1000,
                cacheMaxTimeout: 2000,
                cacheRandomize: false
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

    it('get retrySection config', () => {
        const result = config.getSection<RetrySection>('retry');
        expect(result.cacheRetries).to.equals(testValue.retry.cacheRetries);
        expect(result.cacheFactor).to.equals(testValue.retry.cacheFactor);
        expect(result.cacheMinTimeout).to.equals(testValue.retry.cacheMinTimeout);
        expect(result.cacheMaxTimeout).to.equals(testValue.retry.cacheMaxTimeout);
        expect(result.cacheRandomize).to.equals(testValue.retry.cacheRandomize);
    });
});