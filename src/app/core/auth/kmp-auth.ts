import { Injectable } from '@angular/core';

export interface UserSession {
  authenticated: boolean;
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

declare const KmpAuth: {
  login(username: string, password: string): Promise<UserSession>;
} | undefined;

@Injectable({ providedIn: 'root' })
export class KmpAuthService {
  login(username: string, password: string): Promise<UserSession> {
    if (typeof KmpAuth?.login === 'function') {
      return KmpAuth.login(username, password);
    }

    return Promise.resolve({
      authenticated: !!username && !!password,
      userId: 1,
      username,
      email: `${username}@example.com`,
      firstName: 'Demo',
      lastName: 'User',
      image: 'assets/images/app-logo.svg',
    });
  }
}