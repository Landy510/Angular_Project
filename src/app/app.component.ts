import { Component, OnInit } from '@angular/core';

import { AuthService } from '@api/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.postToGetToken()
      .subscribe({
        next: (res) => {
          this.authService.successSetCookie(`${res.token_type} ${res.access_token}`);
        },
        error: (err) => console.log('token acquire fail', err)
      });
  }
}
