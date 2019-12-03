import { ICustomPromise } from './interfaces/i-custom-promise';
import { IAnyObject } from './interfaces/i-any-object';
import { DataUtil } from './utils/data-util';

export const customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number): Promise<IAnyObject> => {
  return DataUtil.customPromiseAll(promiseList, concurrentLimit);
};
