import { IAnyObject } from '../interfaces/i-any-object';

// This class is only used for testing purposes
export class PromiseUtil {
  public static generateRandomPromise = (timeMagnitude: number) => {
    const time = Math.ceil(Math.random() * 10) * timeMagnitude;
    return (input?: IAnyObject) => {
      return new Promise<IAnyObject>((resolve, reject) => {
        setTimeout(() => {
          if (!input) {
            resolve({ res: 'Finished' });
          } else {
            resolve(input);
          }
        }, time);
      });
    };
  };
}