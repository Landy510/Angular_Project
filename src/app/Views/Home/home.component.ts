import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { HomeService } from '@api/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ElementRef) dropDownCompo!: ElementRef;

  constructor(
    private homeService: HomeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/searchIcon.svg')
    );
  }

  ngOnInit(): void {
    this.homeService.getAllScenicSpots()
      .subscribe({
        next: res => console.log(res),
        error: err => console.log('scenic error', err)
      });
  }

  toggle(el: HTMLDivElement): void {
    el.classList.contains('hidden') ?  el.classList.remove('hidden') : el.classList.add('hidden');
  }
}
