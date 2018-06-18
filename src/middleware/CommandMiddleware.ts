import {Middleware} from "./Middleware";
import {Handler,NullHandler} from "../handler/Handler";
import {CommandHandler} from "../handler/CommandHandler";
import {WSContext,State} from "../common/WSContext";
import {selfContainer} from "../inversify.config";
import { TYPES } from "../types";

/**
 * 命令前缀
 */
const CommandPrefix = "command-";

/**
 * 命令中间件
 */
export default class CommandMiddleware extends Middleware {

    constructor() {
        super();
    }

    getHandler(context: WSContext): Handler {
        if(context.state == State.Command) {
            if(context.event) {
                if(context.event.startsWith(CommandPrefix))
                {
                    return selfContainer.get<CommandHandler>(TYPES.CommandHandler);
                }
            }
        }
        return new NullHandler();
    }
}