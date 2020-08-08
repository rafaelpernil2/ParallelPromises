import { ICustomPromise } from './interfaces/i-custom-promise';
export { ICustomPromise } from './interfaces/i-custom-promise';
/**
 * Executes an array of ICustomPromises with a limit of how many promises you want to exectue at each time
 * @param promiseList An array of custom promises
 * @param concurrentLimit Limits how many promise function are executed at the same time
 */
export async function customPromiseAll(promiseList: ICustomPromise[], concurrentLimit?: number): Promise<Record<string, unknown>> {
  const promisesInProgress = [];
  const results = {};
  const execLimit = concurrentLimit && concurrentLimit <= promiseList.length ? concurrentLimit : promiseList.length;
  for (let index = 0; index < execLimit; index++) {
    promisesInProgress.push(concurrentPromiseExecRec(promiseList[index], promiseList.slice(execLimit), results));
  }
  for (const promise of promisesInProgress) {
    await promise;
  }
  return results;
}

async function concurrentPromiseExecRec(customPromise: ICustomPromise, awaitingPromiseList: ICustomPromise[], resultsObject: Record<string, unknown>): Promise<unknown> {
  let result = {} as Promise<Record<string, unknown>> | unknown;
  if (!customPromise?.hasOwnProperty('function')) {
    throw new Error('Cannot read function of promise');
  }
  resultsObject[customPromise.name] = await customPromise.function.call(customPromise.thisArg, ...(customPromise?.args ?? []));
  if (awaitingPromiseList.length) {
    const nextPromise = awaitingPromiseList.shift();
    if (nextPromise) {
      result = concurrentPromiseExecRec(nextPromise, awaitingPromiseList, resultsObject);
    }
  } else {
    result = resultsObject[customPromise.name];
  }
  return result;
}
