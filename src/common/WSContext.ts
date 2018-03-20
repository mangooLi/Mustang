import BaseReply from './BaseReply';
import BaseRequest from './BaseRequest';
import {Socket} from 'socket.io';

export default class WSContext {

    constructor(public socket:Socket) {
        this.init();
    }

    private init(): void {
    }

    /**
     * 获取来源域名
     */
    get origin(): string {
        let origin = '';
        try{
            origin = this.socket.request.headers.origin;
        }catch{}
        return origin;
    }

    /**
     * 获取访问令牌
     */
    get token(): string {
        let token = '';
        try{
            token = this.socket.request.query.token;
        }catch{}
        return  token;
    }

    /**
     * 关闭WebSocket连接
     */
    close(): void {
        this.socket.disconnect();
    }
}