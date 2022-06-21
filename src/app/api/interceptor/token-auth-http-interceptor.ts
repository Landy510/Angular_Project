import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@api/auth/auth.service';

@Injectable()
export class TokenAuthHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.token$.getValue();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: token }
      });
    }
    return next.handle(req);

  }

}
