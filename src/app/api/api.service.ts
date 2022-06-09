import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  contentHeader = new HttpHeaders({'Authorization': this.getToken})

  get getToken(): string {
    return Cookies.get('AUTH_TOKEN') || ''
  }

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get<any>(url, { headers: this.contentHeader})
  }
}
