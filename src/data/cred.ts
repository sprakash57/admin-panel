import { getRandomNumber } from 'helpers/utils';

export interface TryLogin {
  status: string;
  message: string;
}

export const tryLogin = async (loginState: { userName: string; password: string }): Promise<TryLogin> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (loginState.userName === 'sunnypr' && loginState.password === '123456') {
          resolve({ status: 'success', message: 'Successful login' });
        } else {
          reject({ status: 'error', message: 'Wrong email or password' });
        }
      },
      getRandomNumber(25, 5, true) * 100,
    );
  });
};
