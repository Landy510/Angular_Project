import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '@api/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'practice';

  showFiller = false;

  links = [
    '連結一',
    '連結二',
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['zh', 'en', 'ja']);
    this.translate.use('zh');
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/angular_solidBlack.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/footer_facebook.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/footer_instagram.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'youtube',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/footer_youtube.svg')
    );
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {
    this.authService.postToGetToken()
      .subscribe({
        next: (res) => {
          this.authService.successSetCookie(`${res.token_type} ${res.access_token}`);
        },
        error: (err) => console.log('token acquire fail', err)
      });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
