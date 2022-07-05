import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
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
  }


  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
