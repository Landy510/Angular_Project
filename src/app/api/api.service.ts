import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  baseUrl = 'https://tdx.transportdata.tw/api/basic'

  contentHeader = new HttpHeaders({'Authorization': this.getToken})

  get getToken(): string {
    return Cookies.get('AUTH_TOKEN') || ''
  }

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, { headers: this.contentHeader})
  }
}
