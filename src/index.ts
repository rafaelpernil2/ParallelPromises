import { ICustomPromise } from './interfaces/i-custom-promise';
import { IUntyped } from './interfaces/i-untyped';
import { DataUtil } from './utils/data-util';

export const customPromiseAll = async (promiseList: ICustomPromise[], concurrentLimit?: number): Promise<IUntyped> => {
  return DataUtil.customPromiseAll(promiseList, concurrentLimit);
};
