
/**
 * 配置管理基础接口
 */
export interface ConfigurationManager {

    /**
     * 根据Key获取字符串类型
     * @param key Key
     */
    getStringValue(key: string): string;

    /**
     * 根据Key获取Bool类型
     * @param key Key
     */
    getBooleanValue(key: string): boolean;

    /**
     * 根据Key获取数值
     * @param key key
     */
    getNumberValue(key: string): number;

    /**
     * 根据Key获取配置
     * @param key Key
     */
    getSection<T>(key: string): T;

    /**
     * Key是否存在配置中
     * @param key Key
     */
    exists(key: string): boolean;
}