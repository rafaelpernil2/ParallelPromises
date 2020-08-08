import { expect } from 'chai';
import 'mocha';
import { ICustomPromise } from 'src/interfaces/i-custom-promise';
import { customPromiseAll } from '../index';
import { TestUtil } from '../utils/test-util';

const calcTotalTIme = (hrtime: number[]): number => {
  return hrtime[0] * 1e9 + hrtime[1];
};

describe('Initial test. The method customPromiseAll with a predefined set of dummy promises...', () => {
  it('should return the following object', async () => {
    const concurrentLimit = 3;

    const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: TestUtil.generateRandomPromise(0),
        thisArg: null,
        args: [{ result: 'Result' }]
      },
      {
        name: 'CreateSomething',
        function: TestUtil.generateRandomPromise(0),
        thisArg: null,
        args: [{ result: 'Result' }, { result2: 'Result' }]
      },
      {
        name: 'DeleteSomething',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'UpdateSomething',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'ExternalAPI1',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'ExternalAPI2',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'LoadJSON',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'LoadAuthCookie',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'LoadExternalLibraries',
        function: TestUtil.generateRandomPromise(0)
      },
      {
        name: 'SendLog',
        function: TestUtil.generateRandomPromise(0)
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
        function: TestUtil.generateRandomPromise(10),
        thisArg: null,
        args: [{ result: 'Result' }]
      },
      {
        name: 'CreateSomething',
        function: TestUtil.generateRandomPromise(10),
        thisArg: null,
        args: [{ result: 'Result' }, { result2: 'Result' }]
      },
      {
        name: 'DeleteSomething',
        function: TestUtil.generateRandomPromise(10)
      },
      {
        name: 'UpdateSomething',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'ExternalAPI1',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'ExternalAPI2',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'LoadJSON',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'LoadAuthCookie',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'LoadExternalLibraries',
        function: TestUtil.generateRandomPromise(1)
      },
      {
        name: 'SendLog',
        function: TestUtil.generateRandomPromise(1)
      }
    ];

    const tFirst0 = process.hrtime();
    await customPromiseAll(listOfPromises, concurrentLimitFirst);
    const tFirst1 = process.hrtime(tFirst0);

    const tSecond0 = process.hrtime();
    await customPromiseAll(listOfPromises, concurrentLimitSecond);
    const tSecond1 = process.hrtime(tSecond0);

    expect(calcTotalTIme(tFirst1)).to.above(calcTotalTIme(tSecond1));
  });
});
