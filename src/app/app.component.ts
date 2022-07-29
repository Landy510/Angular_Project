import { Component, OnInit } from '@angular/core';

import { tap, concatMap } from 'rxjs';

import { AuthService } from '@api/auth/auth.service';
import { CommonService } from '@api/common/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.authService.postToGetToken()
      .pipe(
        tap((res) => this.authService.successSetCookie(`${res.token_type} ${res.access_token}`)),
        concatMap(() => this.commonService.getAllCities())
      )
      .subscribe({
        next: (res) => {
          this.commonService.cityList$.next(res);
        }
      });
  }
}
