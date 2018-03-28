import BaseReply from './BaseReply';
import BaseRequest from './BaseRequest';
import {Socket} from 'socket.io';

type CommandFunction = (context: WSContext, event: string, data: any) => void;
type DisconnectionFunction = (context: WSContext) => void;

export class WSContext {
    private commandFns: Array<CommandFunction> = [];
    private disconnectionFns: Array<DisconnectionFunction> = [];

    constructor(public socket:Socket) {
        socket.use((packet, next) => {
            for(let fn of this.commandFns){
                fn(this, packet[0], packet[1]);
            }
            return next();
        });

        socket.on('disconnect', () => {
            for(let fn of this.disconnectionFns) {
                fn(this);
            }
        });
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

    onCommand(fn: CommandFunction): void {
        this.commandFns.push(fn);
    }

    onDisconnection(fn: DisconnectionFunction): void {
        this.disconnectionFns.push(fn);
    }

    /**
     * 关闭WebSocket连接
     */
    close(): void {
        this.socket.disconnect();
    }
}