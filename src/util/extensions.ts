import {Socket} from "socket.io";

/**
 * 因Socket.io头文件缺少Socket.use所以这里进行扩充
 */
declare module "socket.io" {
    interface Socket {
        use(fn:(packet: Array<any>, next: (Error?) => void) => void);
    }
}

/**
 * 工具类
 */
export default class Util {
    static remove<T>(list: Array<T>, item: T): number {
        let index = list.findIndex((value) => {
            return value === item;
        });
        if( index == -1)
            return 0;
        return list.splice(index,1).length;
    }
}