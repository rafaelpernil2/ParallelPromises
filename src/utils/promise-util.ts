import { IUntyped } from '../interfaces/i-untyped';

// This class is only used for testing purposes
export class PromiseUtil {
  public static generateRandomPromise = () => {
    return () => {
      return new Promise<IUntyped>((resolve, reject) => {
        const time = Math.ceil(Math.random() * 10) * 100;
        setTimeout(() => {
          resolve({ res: 'Finished' });
        }, time);
      });
    };
  };
}
