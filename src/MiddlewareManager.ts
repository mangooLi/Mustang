import * as socketio from "socket.io";
import {Middleware} from "./middleware/Middleware";
import {WSContext} from "./common/WSContext";
import Util from "./util/extensions";
import OriginAuthMiddleware from "./middleware/OriginAuthMiddleware";
import { TokenAuthMiddleware } from "./middleware/TokenAuthMiddleware";
import CommandMiddleware from "./middleware/CommandMiddleware";

/**
 * 中间件管理
 */
export class MiddlewareManager {
    private contexts: Array<WSContext> = [];
    private connMiddlewares: Array<Middleware> = [];
    private disconnMiddlewares: Array<Middleware> = [];
    private middlewares: Array<Middleware> = [];

    constructor() {
        this.registerSystemMiddleware();
    }

    /**
     * 注册系统自带中间件
     */
    private registerSystemMiddleware(): void {
        let originAuth = new OriginAuthMiddleware();
        let tokenAuth = new TokenAuthMiddleware();
        let command = new CommandMiddleware();

        this.registerOnConnection(originAuth);
        this.registerOnConnection(tokenAuth);
        this.registerOn(command);
    }

    /**
     * 将中间件注册到指定的生命状态中
     * @param obj 需要注册中间件
     * @param event 指定注册到的状态
     */
    private register(obj: Middleware, state: "disconn" | "conn" | "command"): void {
        if(state === "command") {
            this.middlewares.push(obj);
        } else if(state === "conn") {
            this.connMiddlewares.push(obj);
        } else if(state === "disconn") {
            this.disconnMiddlewares.push(obj);
        }
    }

    registerOnConnection(obj: Middleware): void {
        this.register(obj, "conn");
    }

    registerOn(obj: Middleware): void {
        this.register(obj, "command");
    }

    registerOnDisconnection(obj: Middleware): void {
        this.register(obj, "disconn");
    }

    /**
     * 拦截监听WebSocket的Connection事件
     * @param socket socket对象
     */
    onConnection(socket: socketio.Socket): void {
        if(socket && socket.connected) {
            let context = new WSContext(socket);
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
    private command(context: WSContext, event: string, data: any): void {
    }

    /**
     * 拦截监听WebSocket的Disconnection事件
     * @param context 上下文对象
     */
    private disconnection(context: WSContext): void {


        if(Util.remove(this.contexts, context) > 0) {

        } else {
            //未能从数组中移除输出日志
        }
    }
}