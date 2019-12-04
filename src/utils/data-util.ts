import { IAnyObject } from '../interfaces/i-any-object';
import { ICustomPromise } from '../interfaces/i-custom-promise';

export class DataUtil {
  public static customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number): Promise<IAnyObject> => {
    const promisesInProgress = [];
    const results = {};

    // Set concurrent limit if provided and make sure it is within the amount of promises to process
    const execLimit = concurrentLimit && concurrentLimit <= promiseList.length ? concurrentLimit : promiseList.length;

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
      await promise;
    }

    return results;
  };

  private static concurrentPromiseExecRec = async (customPromise: ICustomPromise, customPromiseList: ICustomPromise[], resultsObject: IAnyObject): Promise<IAnyObject> => {
    let promise;
    let result = {} as Promise<IAnyObject> | IAnyObject;
    const awaitingPromiseList = customPromiseList;
    const args = customPromise.args ? customPromise.args : [];
    

    if (!customPromise || !customPromise.function) {
      throw new Error('Cannot read function of promise');    
    }

    // Call the function
    promise = customPromise.function.call(customPromise.thisArg, ...args);


    // Wait until promise ends
    const promiseResult = await promise;
    // Add property to resultsObject
    resultsObject[customPromise.name] = promiseResult;

    // If there any left promises to process...
    if (awaitingPromiseList.length) {
      // The next promise is loaded and removed from promiseList and if it was provided successfully, it is queued
      const nextPromise = awaitingPromiseList.shift();

      if (nextPromise) {
        result = DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
      }
    } else {
      result = promiseResult;
    }

    return result;
  };
}
