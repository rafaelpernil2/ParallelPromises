import { IUntyped } from './i-untyped';

export interface ICustomPromise {
  name: string;
  function(): PromiseLike<IUntyped>;
}
