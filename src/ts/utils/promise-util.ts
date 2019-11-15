export class PromiseUtil {
    public static generateRandomPromise = () => {
        return () => {
            return new Promise<any>((resolve, reject) => {
                const time = Math.ceil(Math.random() * 10) * 1000;
                setTimeout(() => {
                    resolve({ res: "Finished" })
                }, time);
            })
        }
    }
}