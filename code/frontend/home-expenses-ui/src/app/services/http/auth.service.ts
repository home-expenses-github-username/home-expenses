import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Credentials } from '../../shared/interfaces/credentials';
import { Tokens } from '../../interfaces/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private authApiUrl = `${environment.authApiUrl}`;

  public signupStart(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.authApiUrl}/api/auth/signup-start`, credentials);
  }
  public signupFinish(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.authApiUrl}/api/auth/signup-finish`, credentials);
  }

  public signin(credentials: Credentials): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.authApiUrl}/api/auth/signin`, credentials);
  }

  public signout(): Observable<boolean> {
    // return timer(2000).pipe(map(() => true));
    return this.httpClient.get<boolean>(`${this.authApiUrl}/api/auth/signout`);
  }

  public refreshTokens(): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.authApiUrl}/api/auth/refresh-token`, null);
  }
}
