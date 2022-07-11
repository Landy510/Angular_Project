import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import Cookies from 'js-cookie';

import {
  MSG_DLG_BTN_OK,
  MessageDialogDataBuilder } from '../shared/components/widg-dialog/message-dialog/message-dialog.component';
import { WidgDialogService } from '@shared/components/widg-dialog/widg-dialog.service';
import { ApiError } from './api-error';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://tdx.transportdata.tw/api/basic';

  apiTimeoutInMs = 10000;

  isErrorMessageShowing = false;

  protected contentHeader = new HttpHeaders({ 'Authorization': this.getToken });

  get getToken(): string {
    return Cookies.get('AUTH_TOKEN') || '';
  }

  constructor(
    private http: HttpClient,
    protected dialogService: WidgDialogService
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url)
      .pipe(
        this.handleApiError(this.apiTimeoutInMs)
      )
    ;
  }

  public postToGetToken<T>(getTokenUrl: string, body: URLSearchParams): Observable<T> {
    return this.http.post<T> (
      getTokenUrl,
      body,
      { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).pipe(this.handleApiError(this.apiTimeoutInMs));
  }

  public handleApiError = (apiTimeoutInMs = this.apiTimeoutInMs) => {
    return <T>(source: Observable<T>): Observable<T> => {
      return source.pipe(
        this.catchApiErrorAndThrow(apiTimeoutInMs),
        catchError((error: ApiError) => {
          if (!this.isErrorMessageShowing && error.showAlert) {
            this.isErrorMessageShowing = true;
            const dataBuilder = new MessageDialogDataBuilder();
            dataBuilder.setPositiveButton('ok');
            let action: () => void;
            switch (error.code) {
              case ApiError.INVALID_TOKEN:
                dataBuilder.setMessage(error.message);
                if (error.title) dataBuilder.setTitle(error.title);
                break;
              default:
                dataBuilder.setMessage(error.message);
                break;
            }
            const dialogRef = this.dialogService.openMsgDialog({
              data: dataBuilder.create()
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result === MSG_DLG_BTN_OK && action) {
                action();
              }
              this.isErrorMessageShowing = false;
            });
          }
          return throwError(error);
        })
      );
    };
  };

  protected catchApiErrorAndThrow = (timeoutMillisecond = this.apiTimeoutInMs) => {
    return function<T>(source: Observable<T>): Observable<T> {
      const sourcePipe = source.pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('catchApiError', err);
          let error!: ApiError;
          if (err.error == null || !err) {
            error = ApiError.RequestFail();
          } else if (err.status !== null && err.status === 400) {
            error = ApiError.InvalidToken('Invalid Token', '提醒您');
          }
          return throwError(error);
        })
      );

      if (timeoutMillisecond > 0) {
        return sourcePipe.pipe(
          timeout({
            each: timeoutMillisecond,
            with: () => throwError(ApiError.Timeout())
          })
        );
      }

      return sourcePipe;
    };
  };
}
