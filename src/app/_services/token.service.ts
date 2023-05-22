import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  protected readonly TOKEN_KEY = 'access_token';

  constructor() { }

  protected getToken = (): string | null => localStorage.getItem(this.TOKEN_KEY);

  protected setToken = (token: string): void => localStorage.setItem(this.TOKEN_KEY, token);

  protected removeToken = (): void => localStorage.removeItem(this.TOKEN_KEY);
}
