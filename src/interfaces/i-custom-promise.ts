import { IAnyObject } from './i-any-object';
/*tslint:disable:no-any */
export interface ICustomPromise {
  name: string;
  thisArg?: any;
  args?: any[];
  function(...args: any[]): Promise<IAnyObject>;
}
