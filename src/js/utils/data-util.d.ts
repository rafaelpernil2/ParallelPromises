import { ICustomPromise } from "../interfaces/i-custom-promise";
export declare class DataUtil {
    public static customPromiseAll: (promiseList: ICustomPromise[], concurrentLimit?: number | undefined) => Promise<{}>;
    private static concurrentPromiseExecRec;
}
//# sourceMappingURL=data-util.d.ts.map