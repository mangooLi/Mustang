import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";

/**
 * 中间件根接口
 */
export abstract class Middleware {

    /**
     * 指向下一个中间件
     */
    nextMiddleware: Middleware;

    next(context: WSContext): void {
        if(this.nextMiddleware) {
            this.nextMiddleware.run(context);
        }
    }

    run(context: WSContext): void {
        let handler = this.getHandler(context);

        if(handler.process(context)) {
            this.next(context);
        }
    }

    /**
     * 获取处理程序
     */
    abstract getHandler(context: WSContext): Handler;
}