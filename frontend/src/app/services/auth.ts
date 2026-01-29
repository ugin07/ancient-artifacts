import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { TokenService } from './token';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService, private token: TokenService) {}

  login(username: string, password: string) {
    return this.api.login(username, password).pipe(
      tap(res => this.token.set(res.token))
    );
  }

  logout(): void {
    this.token.clear();
  }

  isLogged(): boolean {
    return this.token.isLogged();
  }
}
