import * as memoryCache from "memory-cache";
import * as redisCache from "redis";
import * as retry from "retry";
import {RedisSection} from "../configuration/RedisSection";
import {RetrySection} from "../configuration/RetrySection";
import {WSSession} from "../entity/WSSession";
import {WSNode} from "../entity/WSNode";
import {NotImplementedError} from "../error/NotImplementedError";


/**
 * 缓存管理
 * 1. 对于并发采用 [Key]-lock 的形式作为缓存Key进行锁定，排除他人同时进行操作
 * 2. 基于配置进行重试，如Redis操作超时无法恢复则会写入Memory-Cache存储，并在恢复后刷新
 * 3. Memory-Cache还将承载直接击破Redis的无效缓存数据，以减少对Redis的影响
 * 
 */
export class CacheManager {
    private operation:retry.RetryOperation;
    private redis:redisCache.RedisClient;

    /**
     * 
     * @param redisCfg Redis相关配置
     * @param retryCfg 重试机制相关配置
     */
    constructor(redisCfg: RedisSection, retryCfg: RetrySection) {
        this.redis = redisCache.createClient({
            host: redisCfg.host,
            port: redisCfg.port,
            password: redisCfg.password,
            tls: redisCfg.tls,
            db: redisCfg.db
        });

        this.operation = retry.operation({
            retries: retryCfg.cacheRetries,
            factor: retryCfg.cacheFactor,
            minTimeout: retryCfg.cacheMinTimeout,
            maxTimeout: retryCfg.cacheMaxTimeout,
            randomize: retryCfg.cacheRandomize
        });
    }

    /**
     * 
     * @param key 
     */
    getWSSession(key: string): WSSession {
        throw new NotImplementedError();
    }

    /**
     * 
     * @param key 
     */
    getWSNode(key: string): WSNode {
        throw new NotImplementedError();
    }

    /**
     * 
     * @param key 
     */
    get(key: string): string {
        throw new NotImplementedError();
    }

    /**
     * 
     * @param key 
     * @param value 
     */
    putWSSession(key: string, value: WSSession): void {

    }

    /**
     * 
     * @param key 
     * @param value 
     */
    putWSNode(key: string, value: WSNode): void {

    }

    /**
     * 
     * @param key 
     * @param value 
     */
    put(key: string, value: string): void {

    }

    /**
     * 
     * @param key 
     */
    delWSSession(key: string): void {

    }

    /**
     * 
     * @param key 
     */
    delWSNode(key: string): void {

    }

    /**
     * 
     * @param key 
     */
    del(key: string): void {

    }

    /**
     * 
     * @param key 
     */
    refresh(key: string): void {

    }
}
