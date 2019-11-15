import { expect } from 'chai';
import 'mocha';
import { IUntyped } from '../interfaces/i-untyped';
import { DataUtil } from '../utils/data-util';
import { PromiseUtil } from '../utils/promise-util';

describe('Initial test. The method DataUtil.customPromiseAll with a predefined set of dummy promises...', () => {
  it('should return the following object', async () => {
    const concurrentLimit = 3;

    const listOfPromises = [
      {
        name: 'GetSomething',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'CreateSomething',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'DeleteSomething',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'UpdateSomething',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'ExternalAPI1',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'ExternalAPI2',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'LoadJSON',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'LoadAuthCookie',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'LoadExternalLibraries',
        function: PromiseUtil.generateRandomPromise()
      },
      {
        name: 'SendLog',
        function: PromiseUtil.generateRandomPromise()
      }
    ];
    // try {
    const result = await DataUtil.customPromiseAll(listOfPromises, concurrentLimit);
    const expectedResult = {
      GetSomething: { res: 'Finished' },
      DeleteSomething: { res: 'Finished' },
      UpdateSomething: { res: 'Finished' },
      CreateSomething: { res: 'Finished' },
      LoadJSON: { res: 'Finished' },
      ExternalAPI2: { res: 'Finished' },
      LoadExternalLibraries: { res: 'Finished' },
      ExternalAPI1: { res: 'Finished' },
      LoadAuthCookie: { res: 'Finished' },
      SendLog: { res: 'Finished' }
    };
    expect(result).to.eql(expectedResult);
  });
});
