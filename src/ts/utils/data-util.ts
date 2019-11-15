import { ICustomPromise } from "../interfaces/i-custom-promise";
import { IUntyped } from "../interfaces/i-untyped";

export class DataUtil {

    public static customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number) => {
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

        // Await promises

        for (let index = 0; index < promisesInProgress.length; index++) {
            console.log(promiseList[index].name, await promisesInProgress[index]);;
            // No data processing here
        }

        console.log(results);

        return results;
    }

    private static concurrentPromiseExecRec = (promise: ICustomPromise, promiseList: ICustomPromise[], resultsObject: IUntyped): Promise<IUntyped> => {
        let resultPromise;
        const awaitingPromiseList = promiseList;

        if (promise && promise.function) {
            resultPromise = promise.function();
        } else {
            throw new Error("Cannot read function of promise");
        }

        // Logging
        console.log("\x1b[33m%s\x1b[0m", `INITIALIZED: ${promise.name}`);
        console.timeLog(`${promise.name}`);



        // If there any left promises to process...
        // Else, simply execute
        if (awaitingPromiseList.length) {
            // The next promise is loaded and removed from promiseList

            resultPromise.then((result) => {
                const nextPromise = awaitingPromiseList.shift();
                console.log("\x1b[32m%s\x1b[0m", `EXECUTED: ${promise.name}`);
                console.timeEnd(`${promise.name}`);
                // Add property to resultsObject
                resultsObject[promise.name] = result;
                // If a next promise was provided successfully, it is queued
                if (nextPromise) {
                    // Time logs
                    console.time(`${nextPromise.name}`);
                    console.log("\x1b[35m%s\x1b[0m", `QUEUED ${nextPromise.name} by ${promise.name}`);
                    console.timeLog(`${nextPromise.name}`);
                    // Add property to resultsObject
                    resultsObject[promise.name] = result;
                    resultPromise = DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
                }
            });
        } else {
            resultPromise.then((result) => {
                console.log("\x1b[32m%s\x1b[0m", `EXECUTED: ${promise.name}`);
                console.timeEnd(`${promise.name}`);
                // Add property to resultsObject
                resultsObject[promise.name] = result;
                // console.log(resultsObject);
            });
        }




        return resultPromise;
    }
}
