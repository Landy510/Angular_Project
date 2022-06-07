import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { token } from './types'
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = ''
  client_id = 'stealing610-0ee4792d-e572-423b'
  client_secret = '251bfba9-f771-413b-8d22-cb9853f687ab'
  grant_type = 'client_credentials'

  constructor(private http: HttpClient) { }

  getToken(): void {
    const body = new URLSearchParams()
    body.set('grant_type', this.grant_type)
    body.set('client_id', this.client_id)
    body.set('client_secret', this.client_secret)

    const option = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    this.http.post<token>(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      body,
      option
    )
    .subscribe(res => this.token = res.access_token)
  }
}
