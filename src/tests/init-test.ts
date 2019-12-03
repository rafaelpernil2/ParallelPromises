import { expect } from 'chai';
import 'mocha';
import { ICustomPromise } from 'src/interfaces/i-custom-promise';
import { customPromiseAll } from '../index';
import { PromiseUtil } from '../utils/promise-util';

describe('Initial test. The method customPromiseAll with a predefined set of dummy promises...', () => {
  it('should return the following object', async () => {
    const concurrentLimit = 3;

    const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: PromiseUtil.generateRandomPromise(10),
        thisArg: undefined,
        args: [{ result: 'Result' }]
      },
      {
        name: 'CreateSomething',
        function: PromiseUtil.generateRandomPromise(10),
        thisArg: undefined,
        args: [{ result: 'Result' }, { result2: 'Result' }]
      },
      {
        name: 'DeleteSomething',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'UpdateSomething',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'ExternalAPI1',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'ExternalAPI2',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadJSON',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadAuthCookie',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadExternalLibraries',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'SendLog',
        function: PromiseUtil.generateRandomPromise(10)
      }
    ];

    const result = await customPromiseAll(listOfPromises, concurrentLimit);
    const expectedResult = {
      GetSomething: { result: 'Result' },
      DeleteSomething: { res: 'Finished' },
      UpdateSomething: { res: 'Finished' },
      CreateSomething: { result: 'Result' },
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

describe('Concurrency limit test. Two executions of method customPromiseAll with a common predefined set of dummy promises with different concurrency limits....', () => {
  it('should take more time to complete the first batch, the one with a lower concurrency limit', async () => {
    const concurrentLimitFirst = 1;
    const concurrentLimitSecond = 9;

    const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: PromiseUtil.generateRandomPromise(1000),
        thisArg: undefined,
        args: [{ result: 'Result' }]
      },
      {
        name: 'CreateSomething',
        function: PromiseUtil.generateRandomPromise(1000),
        thisArg: undefined,
        args: [{ result: 'Result' }, { result2: 'Result' }]
      },
      {
        name: 'DeleteSomething',
        function: PromiseUtil.generateRandomPromise(100)
      },
      {
        name: 'UpdateSomething',
        function: PromiseUtil.generateRandomPromise(100)
      },
      {
        name: 'ExternalAPI1',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'ExternalAPI2',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadJSON',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadAuthCookie',
        function: PromiseUtil.generateRandomPromise(10)
      },
      {
        name: 'LoadExternalLibraries',
        function: PromiseUtil.generateRandomPromise(100)
      },
      {
        name: 'SendLog',
        function: PromiseUtil.generateRandomPromise(10)
      }
    ];

    const tFirst0 = process.hrtime();
    await customPromiseAll(listOfPromises, concurrentLimitFirst);
    const tFirst1 = process.hrtime(tFirst0);

    const tSecond0 = process.hrtime();
    await customPromiseAll(listOfPromises, concurrentLimitSecond);
    const tSecond1 = process.hrtime(tSecond0);

    expect(tFirst1[1]).to.above(tSecond1[1]);
  });
});
