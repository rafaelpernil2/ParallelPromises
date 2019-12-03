import { IAnyObject } from './interfaces/i-any-object';
import { ICustomPromise } from './interfaces/i-custom-promise';
import { DataUtil } from './utils/data-util';

export const customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number): Promise<IAnyObject> => {
  return DataUtil.customPromiseAll(promiseList, concurrentLimit);
};
