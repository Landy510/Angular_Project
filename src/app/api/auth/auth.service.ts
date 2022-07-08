import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';

import { token } from './types';
import { ApiService } from '@api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  client_id = '123';

  client_secret = '251bfba9-f771-413b-8d22-cb9853f687ab';

  grant_type = 'client_credentials';

  token$ = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  setCookie(token: string) {
    Cookies.set('AUTH_TOKEN', token, { path: '/' });
    this.token$.next(token);
  }

  postToGetToken(): Observable<token> {
    const body = new URLSearchParams();
    body.set('grant_type', this.grant_type);
    body.set('client_id', this.client_id);
    body.set('client_secret', this.client_secret);

    return this.api.postToGetToken(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      body
    );
  }

  successSetCookie(token: string) {
    this.setCookie(token);
  }
}
