
/**
 * JWT配置
 */
export interface JsonWebTokenSection {
    /**
     * 加密用的密钥
     */
    secret: string;
    /**
     * 超时时间，单位MS
     */
    expire: number;
    /**
     * 接受该JWT一方，一般为域名
     */
    aud: string;
}