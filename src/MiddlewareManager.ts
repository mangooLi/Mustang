import * as socketio from "socket.io";
import {Middleware} from "./middleware/Middleware";
import {WSContext, State} from "./common/WSContext";
import Util from "./util/extensions";
import OriginAuthMiddleware from "./middleware/OriginAuthMiddleware";
import { TokenAuthMiddleware } from "./middleware/TokenAuthMiddleware";
import CommandMiddleware from "./middleware/CommandMiddleware";
import ErrorMiddleware from "./middleware/ErrorMiddleware";

/**
 * 中间件管理
 */
export class MiddlewareManager {
    private contexts: Array<WSContext> = [];
    
    /**
     * 指向第一个中间件
     */
    private firstMiddleware: Middleware;
    /**
     * 指向最后一个中间件
     */
    private lastMiddleware: Middleware;
    /**
     * 中间件列表
     */
    private middlewareList: Array<Middleware> = [];

    constructor() {
        this.registerSystemMiddleware();
    }

    /**
     * 注册系统自带中间件
     */
    private registerSystemMiddleware(): void {
        let errorMid = new ErrorMiddleware();
        let originAuthMid = new OriginAuthMiddleware();
        let tokenAuthMid = new TokenAuthMiddleware();
        let commandMid = new CommandMiddleware();

        this.registerMiddleware(errorMid);
        this.registerMiddleware(originAuthMid);
        this.registerMiddleware(tokenAuthMid);
        this.registerMiddleware(commandMid);
    }

    registerMiddleware(obj: Middleware): void {
        if(this.firstMiddleware === undefined) {
            this.lastMiddleware = this.firstMiddleware = obj;
        } else {
            this.lastMiddleware.nextMiddleware = obj;
            this.lastMiddleware = obj;
        }
        this.middlewareList.push(obj);
    }

    /**
     * 拦截监听WebSocket的Connection事件
     * @param socket socket对象
     */
    onConnection(socket: socketio.Socket): void {
        if(socket && socket.connected) {
            let context = new WSContext(socket);
            context.state = State.Connection;
            context.onCommand(this.command);
            context.onDisconnection(this.disconnection);
            this.contexts.push(context);
        } else {
            //日志记录
        }
    }

    /**
     * 拦截监听正常命令
     * @param context 上下文对象
     */
    private command(context: WSContext): void {
        context.state = State.Command;
        this.firstMiddleware.run(context);
    }

    /**
     * 拦截监听WebSocket的Disconnection事件
     * @param context 上下文对象
     */
    private disconnection(context: WSContext): void {
        context.state = State.Disconnection;
        this.firstMiddleware.run(context);

        if(Util.remove(this.contexts, context) > 0) {

        } else {
            //未能从数组中移除输出日志
        }
    }
}