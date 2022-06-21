import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retryWhen, delay, take } from 'rxjs/operators';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://tdx.transportdata.tw/api/basic';

  protected contentHeader = new HttpHeaders({ 'Authorization': this.getToken });

  get getToken(): string {
    return Cookies.get('AUTH_TOKEN') || '';
  }

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url)
      .pipe(
        retryWhen(error => error.pipe(delay(1000), take(3)))
      );
  }
}
