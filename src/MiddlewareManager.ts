import * as socketio from "socket.io";
import {Middleware} from "./middleware/Middleware";
import {WSContext} from "./common/WSContext";
import {Container} from "inversify";
import Util from "./util/extensions";

/**
 * 中间件管理
 */
export class MiddlewareManager {
    contexts: Array<WSContext> = [];

    constructor() {
    }

    /**
     * 注册系统自带中间件
     */
    private registerSystemMiddleware(): void {
        
    }

    /**
     * 将中间件注册到指定的生命状态中
     * @param obj 需要注册中间件
     * @param event 指定注册到的状态
     */
    private register(obj: Middleware): void {
    }

    registerOnConnection(obj: Middleware): void {
    }

    registerOn(obj: Middleware): void {
    }

    registerOnDisconnection(obj: Middleware): void {
    }

    unregisterOnConnection(obj: Middleware): void {
    }

    unregisterOnDisconnection(obj: Middleware): void {
    }

    unregisterOn(obj: Middleware): void {
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