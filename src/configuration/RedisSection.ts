
/**
 * Redis配置
 */
export interface RedisSection {
    host: string;
    port: number;
    password: string;
    db: string;
    tls: boolean;
}