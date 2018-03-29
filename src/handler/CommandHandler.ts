import {Handler} from "./Handler";
import {WSContext} from "../common/WSContext";
import {injectable} from "inversify";
import { NotImplementedError } from "../error/NotImplementedError";

@injectable()
export class CommandHandler implements Handler {

    constructor() {
        
    }

    process(context: WSContext): boolean {
        throw new NotImplementedError();
    }
}