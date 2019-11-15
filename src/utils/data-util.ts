import { ICustomPromise } from '../interfaces/i-custom-promise';
import { IUntyped } from '../interfaces/i-untyped';

export class DataUtil {
  public static customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number): Promise<IUntyped> => {
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
      await promise;
    }

    return results;
  };

  private static concurrentPromiseExecRec = async (customPromise: ICustomPromise, customPromiseList: ICustomPromise[], resultsObject: IUntyped): Promise<IUntyped> => {
    let promise;
    let result = {} as Promise<IUntyped> | IUntyped;
    const awaitingPromiseList = customPromiseList;

    if (customPromise && customPromise.function) {
      promise = customPromise.function();
    } else {
      throw new Error('Cannot read function of promise');
    }

    // If there any left promises to process...
    if (awaitingPromiseList.length) {
      // The next promise is loaded and removed from promiseList and if it was provided successfully, it is queued
      const nextPromise = awaitingPromiseList.shift();
      // Wait until promise ends
      const promiseResult = await promise;
      // Add property to resultsObject
      resultsObject[customPromise.name] = promiseResult;

      if (nextPromise) {
        // Add property to resultsObject
        resultsObject[customPromise.name] = promiseResult;
        result = DataUtil.concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
      }
    } else {
      const promiseResult = await promise;

      // Add property to resultsObject
      resultsObject[customPromise.name] = promiseResult;
      result = promiseResult;
    }

    return result;
  };
}
