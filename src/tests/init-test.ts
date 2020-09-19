import { expect } from 'chai';
import 'mocha';
import { ERROR_MSG } from '../constants/error-messages';
import { ICustomPromise } from '../interfaces/i-custom-promise';
import { customPromiseAll } from '../index';
import { TestUtil } from '../utils/test-util';

const calcTotalTIme = (hrtime: number[]): number => {
  return hrtime[0] * 1e9 + hrtime[1];
};
describe('Initial test. The method customPromiseAll with at least one custom promise WITHOUT "function" property', () => {
  it(`should throw an error containing ${ERROR_MSG.NO_PROMISE_FUNCTION}`, async () => {
    const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: TestUtil.generateRandomPromise(0),
        thisArg: null,
        args: [{ result: 'Result' }]
      },
      { name: 'Test' } as ICustomPromise
    ];
    let result;
    try {
      await customPromiseAll(listOfPromises);
    } catch (error) {
      result = error;
    }
    expect(result.message).to.eql(ERROR_MSG.NO_PROMISE_FUNCTION);
  });
});

describe('Initial test. The method customPromiseAll with at least one custom promise WITHOUT "name" property', () => {
  it(`should throw an error containing ${ERROR_MSG.NO_PROMISE_NAME}`, async () => {
    const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: TestUtil.generateRandomPromise(0),
        thisArg: null,
        args: [{ result: 'Result' }]
      },
      { function: TestUtil.generateRandomPromise(0) } as ICustomPromise
    ];
    let result;
    try {
      await customPromiseAll(listOfPromises);
    } catch (error) {
      result = error;
    }
    expect(result.message).to.eql(ERROR_MSG.NO_PROMISE_NAME);
  });
});

describe('Initial test. The method customPromiseAll with a predefined set of dummy custom promises...', () => {
  it('should return the an object with each resolved promise indexed by each custom promise "name" property', async () => {
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
  it('should take about "Math.floor(promiseAmount / concurrencyLimit) * time + remainder" to execute', async () => {
    const concurrencyLimit = 8;
    const promiseAmount = 10;
    const time = 1; // In seconds
    const listOfPromises: ICustomPromise[] = [];
    for (let num = 0; num < promiseAmount; num++) {
      listOfPromises.push({
        name: `Test${num}`,
        function: TestUtil.timeoutPromiseFunction(time * 1e3)
      });
    }

    const timeStart = process.hrtime();
    await customPromiseAll(listOfPromises, concurrencyLimit);
    const timeEnd = process.hrtime(timeStart);

    const execTime = Math.floor(calcTotalTIme(timeEnd) / 1e9);
    const remainder = promiseAmount % concurrencyLimit > 0 ? time : 0;
    const expectedTime = Math.floor(promiseAmount / concurrencyLimit) * time + remainder;

    expect(concurrencyLimit).to.below(promiseAmount);
    expect(execTime).to.eql(expectedTime);
  });
});
