import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retryWhen, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://tdx.transportdata.tw/api/basic';

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url)
      .pipe(
        retryWhen(error => error.pipe(delay(1000), take(3)))
      );
  }
}
