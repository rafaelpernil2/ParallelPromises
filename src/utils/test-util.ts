// This class is only used for testing purposes
export class TestUtil {
  public static generateRandomPromise = (timeMagnitude: number): ((input?: Record<string, unknown>) => Promise<Record<string, unknown>>) => {
    const time = Math.ceil(Math.random() * 10) * timeMagnitude;
    return (input?: Record<string, unknown>): Promise<Record<string, unknown>> => {
      return new Promise<Record<string, unknown>>(resolve => {
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
