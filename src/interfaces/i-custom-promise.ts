/* eslint-disable @typescript-eslint/no-explicit-any */
/*tslint:disable:no-any */
export interface ICustomPromise {
  name: string;
  thisArg?: any;
  args?: any[];
  function(...args: any[]): Promise<any>;
}
