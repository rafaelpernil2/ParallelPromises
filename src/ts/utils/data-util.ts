import { ICustomPromise } from "../interfaces/i-custom-promise";
import { IUntyped } from "../interfaces/i-untyped";

export class DataUtil {

    public static customPromiseAll = async (promiseList: Array<{ name: string, function: () => Promise<IUntyped> }>, concurrentLimit?: number) => {
        const promisesInProgress = [];
        const results = {};

        // Set concurrent limit if provided
        const execLimit = concurrentLimit ? concurrentLimit : promiseList.length;

        // We remove the initial promises are going to queue
        const awaitingPromises = promiseList.slice(execLimit, promiseList.length);

        // Initialization of promises
        for (let index = 0; index < execLimit; index++) {
            const promise = promiseList[index];
            // Time logs
            console.time(`${promise.name}`);
            // console.log("\x1b[33m%s\x1b[0m", `INITIALIZED: ${promise.name}`);
            // console.timeLog(`${promise.name}`);
            promisesInProgress.push(DataUtil.concurrentPromiseExecRec(promise, awaitingPromises, results));
        }

        return results;
    }

    private static concurrentPromiseExecRec = (promise: ICustomPromise, promiseList: ICustomPromise[], resultsObject: IUntyped) => {
        let fun;
        const awaitingPromiseList = promiseList;

        if (promise && promise.function) {
            fun = promise.function();
        } else {
            return new Error("Cannot read function of promise");
        }

        // Logging
        console.log("\x1b[33m%s\x1b[0m", `INITIALIZED: ${promise.name}`);
        // console.timeLog(`${promise.name}`);

        fun.then(() => {
            console.log("\x1b[32m%s\x1b[0m", `EXECUTED: ${promise.name}`);
            // console.timeEnd(`${promise.name}`);
        });

        // If there any left promises to process...
        if (awaitingPromiseList.length) {
            // The next promise is loaded and removed from promiseList
            const nextPromise = awaitingPromiseList.shift();
            fun.then((result) => {
                // Add property to resultsObject
                resultsObject[promise.name] = result;
                // If a next promise was provided successfully, it is queued
                if (nextPromise) {// Time logs
                    console.time(`${nextPromise.name}`);
                    console.log("\x1b[35m%s\x1b[0m", `QUEUED ${nextPromise.name} by ${promise.name}`);
                    // console.timeLog(`${nextPromise.name}`);

                    DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
                }
            });
        }
        // Else, simply execute
    }
}
