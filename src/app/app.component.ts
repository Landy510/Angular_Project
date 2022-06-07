import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../app/api/token.service'
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
    '連結二'
  ]

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private tokenService: TokenService
  ) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/angular_solidBlack.svg'));
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {
      this.tokenService.getToken()
  }
}
