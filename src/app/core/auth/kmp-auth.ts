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
}