import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Credentials } from '../../shared/interfaces/credentials';

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

  public signin(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.authApiUrl}/api/auth/signin`, credentials);
  }
}
