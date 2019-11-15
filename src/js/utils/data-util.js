"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class DataUtil {
}
exports.DataUtil = DataUtil;
DataUtil.customPromiseAll = (promiseList, concurrentLimit) => __awaiter(void 0, void 0, void 0, function* () {
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
});
DataUtil.concurrentPromiseExecRec = (promise, promiseList, resultsObject) => {
    let fun;
    const awaitingPromiseList = promiseList;
    if (promise && promise.function) {
        fun = promise.function();
    }
    else {
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
            if (nextPromise) { // Time logs
                console.time(`${nextPromise.name}`);
                console.log("\x1b[35m%s\x1b[0m", `QUEUED ${nextPromise.name} by ${promise.name}`);
                // console.timeLog(`${nextPromise.name}`);
                DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
            }
        });
    }
    // Else, simply execute
};
//# sourceMappingURL=data-util.js.map