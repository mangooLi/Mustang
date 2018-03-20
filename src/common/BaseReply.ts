
/**
 * 回应必须实现接口
 */
export default interface BaseReply<T> {
    data: T;
    code: number;
    remark: string;
}