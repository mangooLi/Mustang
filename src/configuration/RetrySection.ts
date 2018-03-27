
/**
 * 重试配置
 */
export interface RetrySection {
    /**
     * 缓存重试次数
     */
    cacheRetries: number;
    /**
     * 重试因子数
     */
    cacheFactor: number;
    /**
     * 第一次重试前等待时间，单位MS
     */
    cacheMinTimeout: number;
    /**
     * 等待最大时间，单位MS
     */
    cacheMaxTimeout: number;
    /**
     * 是否随机生成间隔等待时间
     */
    cacheRandomize: boolean;
}