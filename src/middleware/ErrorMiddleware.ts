import {Middleware} from "./Middleware";
import {Handler} from "../handler/Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

/**
 * 异常中间件，作为全局第一个中间件，负责所有异常日志记录等
 */
export default class ErrorMiddleware extends Middleware implements Handler {
    
    constructor() {
        super();
    }

    run(context: WSContext): void {
        let handler = this.getHandler(context);

        if(handler.process(context)) {
            try {
                this.next(context);
            } catch (e) {
                let ex = e;
            }
        }
    }

    getHandler(context: WSContext): Handler {
        return this;
    }

    process(context: WSContext): boolean {
        return true;
    }
}