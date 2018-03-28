import {Handler} from "./Handler";
import {WSContext} from "../common/WSContext";
import { NotImplementedError } from "../error/NotImplementedError";

export class CommandHandler implements Handler {
    process(context: WSContext): boolean {
        throw new NotImplementedError();
    }
}