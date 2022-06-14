import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Cookies from 'js-cookie';
import { Observable } from 'rxjs';

import { token } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  client_id = 'stealing610-0ee4792d-e572-423b';

  client_secret = '251bfba9-f771-413b-8d22-cb9853f687ab';

  grant_type = 'client_credentials';

  constructor(private http: HttpClient) { }

  get getToken() {
    return Cookies.get('AUTH_TOKEN') || '';
  }

  setCookie(token: string) {
    Cookies.set('AUTH_TOKEN', token, { path: '/' });
  }

  postToGetToken(): Observable<token> {
    const body = new URLSearchParams();
    body.set('grant_type', this.grant_type);
    body.set('client_id', this.client_id);
    body.set('client_secret', this.client_secret);

    const option = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<token> (  // 這邊的 url 保持完整的路徑，因為它的 baseUrl 跟別人不太一樣
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      body,
      option
    );
  }

  successSetCookie(token: string) {
    this.setCookie(token);
  }
}
