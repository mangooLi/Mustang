import { WSContext } from "../common/WSContext";

/**
 * 处理程序根接口
 */
export interface Handler {
    /**
     * 处理进程，如果返回true表示继续向下，否则不继续
     * @param context 上下文
     */
    process(context: WSContext): boolean;
}