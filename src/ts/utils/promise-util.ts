import { IUntyped } from "../interfaces/i-untyped";

export class PromiseUtil {
    public static generateRandomPromise = () => {
        return () => {
            return new Promise<IUntyped>((resolve, reject) => {
                const time = Math.ceil(Math.random() * 10) * 1000;
                setTimeout(() => {
                    // console.log("Promise executed in " + time/1000 + " seconds");
                    resolve({ res: "Finished" });
                }, time);
            });
        };
    }
}
