import { ICustomPromise } from './interfaces/i-custom-promise';
import { ICustomPromiseData } from './interfaces/i-custom-promise-data';
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
  const awaitingPromiseList = promiseList.slice(execLimit);
  for (let index = 0; index < execLimit; index++) {
    promisesInProgress.push(concurrentPromiseExecRec({ currentPromise: promiseList[index], awaitingPromiseList, resultsObject }));
  }
  for (const promise of promisesInProgress) {
    await promise;
  }
  return resultsObject;
}

async function concurrentPromiseExecRec({ currentPromise, awaitingPromiseList, resultsObject }: ICustomPromiseData): Promise<unknown> {
  if (!currentPromise?.hasOwnProperty('function')) {
    throw new Error('Cannot read function of promise');
  }
  resultsObject[currentPromise.name] = await currentPromise.function.call(currentPromise.thisArg, ...(currentPromise?.args ?? []));
  const nextPromise = awaitingPromiseList.shift();
  if (!nextPromise) {
    return;
  }
  return concurrentPromiseExecRec({ currentPromise: nextPromise, awaitingPromiseList, resultsObject });
}
