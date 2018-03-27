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
     * 是否存在迁移，如果Redis出现瞬时故障将由Memory暂接管，并在下次Redis恢复后修复。
     */
    private migration:boolean;

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
     * 用于防并发的锁
     */
    private lock(key: string): boolean {
        throw new NotImplementedError();
    }

    /**
     * 用于释放锁
     */
    private unlock(key: string) {
        throw new NotImplementedError();
    }

    /**
     * 从缓存中获取WebSocket会话信息
     * @param key Token哈希值
     */
    getWSSession(key: string): WSSession {
        throw new NotImplementedError();
    }

    /**
     * 从缓存中获取WebSocket数据节点
     * @param key Path哈希值
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
     * 将WebSocket会话信息保存到缓存
     * @param key Token哈希值
     * @param value 需要的保存的会话
     */
    putWSSession(key: string, value: WSSession): void {

    }

    /**
     * 将WebSocket数据节点保存到缓存
     * @param key Path哈希值
     * @param value 需要保存的数据节点
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

    /**
     * 用于缓存不存在或无效数据，以防止恶意击破缓存
     * @param key 无效数据Key
     */
    cacheNoExistedData(key: string): void {
        
    }
}
