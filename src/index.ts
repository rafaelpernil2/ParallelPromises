import { ICustomPromise } from './interfaces/i-custom-promise';
export { ICustomPromise } from './interfaces/i-custom-promise';
/**
 * Executes an array of ICustomPromises with a limit of how many promises you want to exectue at each time
 * @param promiseList An array of custom promises
 * @param concurrentLimit Limits how many promise function are executed at the same time
 */
export async function customPromiseAll(promiseList: ICustomPromise[], concurrentLimit?: number): Promise<Record<string, unknown>> {
  const promisesInProgress = [];
  const resultsObject = {};
  const execLimit = concurrentLimit && concurrentLimit <= promiseList.length ? concurrentLimit : promiseList.length;
  for (let index = 0; index < execLimit; index++) {
    promisesInProgress.push(concurrentPromiseExecRec({ nextPromise: promiseList[index], awaitingPromiseList: promiseList.slice(execLimit), resultsObject }));
  }
  for (const promise of promisesInProgress) {
    await promise;
  }
  return resultsObject;
}

async function concurrentPromiseExecRec(data: { nextPromise: ICustomPromise; awaitingPromiseList: ICustomPromise[]; resultsObject: Record<string, unknown> }): Promise<unknown> {
  if (!data.nextPromise?.hasOwnProperty('function')) {
    throw new Error('Cannot read function of promise');
  }
  data.resultsObject[data.nextPromise.name] = await data.nextPromise.function.call(data.nextPromise.thisArg, ...(data.nextPromise?.args ?? []));
  return checkNextPromise(data);
}

function checkNextPromise(data: { nextPromise: ICustomPromise; awaitingPromiseList: ICustomPromise[]; resultsObject: Record<string, unknown> }): unknown | Promise<unknown> {
  let result;
  if (data.awaitingPromiseList.length) {
    const nextPromise = data.awaitingPromiseList.shift();
    if (nextPromise) {
      result = concurrentPromiseExecRec({ nextPromise, awaitingPromiseList: data.awaitingPromiseList, resultsObject: data.resultsObject });
    }
  } else {
    result = data.resultsObject[data.nextPromise.name];
  }
  return result;
}
