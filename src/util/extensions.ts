import {Socket} from "socket.io";

declare module "socket.io" {
    interface Socket {
        use(fn:(packet: Array<any>, next: (Error?) => void) => void);
    }
}