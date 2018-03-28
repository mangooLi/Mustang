import { Handler } from "./Handler";
import { WSContext } from "../common/WSContext";


class NullHandler implements Handler {
    process(context: WSContext): boolean {
        return true;
    }
}