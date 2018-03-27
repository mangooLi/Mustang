import * as socketio from "socket.io";
import {Middleware} from "./middleware/Middleware";
import {Container} from "inversify";

/**
 * 中间件管理
 */
export class MiddlewareManager {
    container: Container;

    constructor() {
    }

    /**
     * 将中间件注册到指定的生命状态中
     * @param obj 需要注册中间件
     * @param event 指定注册到的状态
     */
    private register(obj: Middleware, event: string): void {
    }

    registerOnConnection(obj: Middleware): void {

    }

    registerOn(obj: Middleware, event: string): void {

    }

    registerOnDisconnection(obj: Middleware): void {

    }

    unregisterOnConnection(obj: Middleware): void {

    }

    unregisterOnDisconnection(obj: Middleware): void {

    }

    unregisterOn(obj: Middleware, event: string): void {

    }

    /**
     * 拦截监听WebSocket的Connection事件
     * @param socket 
     */
    onConnection(socket: socketio.Socket): void {

    }

    /**
     * 拦截监听WebSocket的Disconnection事件
     * @param socket 
     */
    onDisconnection(socket: socketio.Socket): void {

    }
}