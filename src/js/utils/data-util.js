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
        promisesInProgress.push(DataUtil.concurrentPromiseExecRec(promise, awaitingPromises, results));
    }
    // Await promises
    for (const promise of promisesInProgress) {
        // No data processing here
        yield promise;
    }
    return results;
});
DataUtil.concurrentPromiseExecRec = (customPromise, customPromiseList, resultsObject) => __awaiter(void 0, void 0, void 0, function* () {
    let promise;
    let result = {};
    const awaitingPromiseList = customPromiseList;
    if (customPromise && customPromise.function) {
        promise = customPromise.function();
    }
    else {
        throw new Error("Cannot read function of promise");
    }
    // If there any left promises to process...
    if (awaitingPromiseList.length) {
        // The next promise is loaded and removed from promiseList and if it was provided successfully, it is queued
        const nextPromise = awaitingPromiseList.shift();
        // Wait until promise ends
        const promiseResult = yield promise;
        // Add property to resultsObject
        resultsObject[customPromise.name] = promiseResult;
        if (nextPromise) {
            // Add property to resultsObject
            resultsObject[customPromise.name] = promiseResult;
            result = DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
        }
    }
    else {
        const promiseResult = yield promise;
        // Add property to resultsObject
        resultsObject[customPromise.name] = promiseResult;
        result = promiseResult;
    }
    return result;
});
//# sourceMappingURL=data-util.js.map