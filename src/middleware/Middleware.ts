import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";

/**
 * 中间件根接口
 */
export interface Middleware {
    /**
     * 获取处理程序
     */
    getHandler(context: WSContext): Handler;
}