import { IAnyObject } from '../interfaces/i-any-object';

// This class is only used for testing purposes
export class PromiseUtil {
  public static generateRandomPromise = (timeMagnitude: number) => {
    return (input?: IAnyObject) => {
      return new Promise<IAnyObject>((resolve, reject) => {
        const time = Math.ceil(Math.random() * 10) * timeMagnitude;
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
