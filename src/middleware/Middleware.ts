import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";

/**
 * 中间件根接口
 */
export interface Middleware {
    /**
     * 需要监听的状态
     */
    state: MiddlewareState;
    /**
     * 当state为Command时该字段启用
     */
    event: string;
    /**
     * 获取处理程序
     */
    getHandler(context: WSContext): Handler;
}

export enum MiddlewareState {
    Connection = "connection",
    Disconnection = "disconnection",
    Command = "command"
}