import { IUntyped } from "../interfaces/i-untyped";

export class PromiseUtil {
    public static generateRandomPromise = () => {
        return () => {
            return new Promise<IUntyped>((resolve, reject) => {
                const time = Math.ceil(Math.random() * 10) * 1000;
                setTimeout(() => {
                    resolve({ res: "Finished" });
                }, time);
            });
        };
    }
}
