import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://tdx.transportdata.tw/api/basic';

  contentHeader = new HttpHeaders({ 'Authorization': this.getToken });

  get getToken(): string {
    return Cookies.get('AUTH_TOKEN') || '';
  }

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url, { headers: this.contentHeader })
      .pipe(retry(3));
  }
}
