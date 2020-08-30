import { ICustomPromise } from './i-custom-promise';

export interface ICustomPromiseData {
  currentPromise: ICustomPromise;
  awaitingPromiseList: ICustomPromise[];
  resultsObject: Record<string, unknown>;
}
