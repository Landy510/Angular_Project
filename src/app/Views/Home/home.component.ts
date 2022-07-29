import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from '@api/common/common.service';
import { HomeService } from '@api/home/home.service';
import { ScenicSpot, ActivityList, DelicacyList, AccommodationList } from '@api/home/types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ElementRef) dropDownCompo!: ElementRef;

  selectedValue: string = '';

  typeList: string[] = [
    '旅遊景點',
    '觀光活動',
    '美食品嚐',
    '住宿推薦',
  ];

  cityList: any[] = [];

  scenicList: ScenicSpot[] = [];

  activityList: ActivityList[] = [];

  delicacyList: DelicacyList[] = [];

  accommodationList: AccommodationList[] = [];

  typeOption: string = '';

  cityOption: string = '';

  constructor(
    private homeService: HomeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private commonService: CommonService
  ) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/searchIcon.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'location',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/locationIcon.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'clock',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/clockIcon.svg')
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'phone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/phoneIcon.svg')
    );
  }

  ngOnInit(): void {
    this.commonService.cityList$
      .subscribe(res => {
        this.cityList = res;
      });
    this.homeService.getAllScenicSpots()
      .subscribe({
        next: res => {
          let count = 0;
          this.scenicList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 5;
          });
        },
        error: err => console.log('scenic error', err)
      });
    this.homeService.getAllActivityList()
      .subscribe({
        next: res => {
          let count = 0;
          this.activityList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        }
      });
    this.homeService.getAllDelicacyList()
      .subscribe({
        next: res => {
          let count = 0;
          this.delicacyList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        }
      });

    this.homeService.getAllAccommodationList()
      .subscribe({
        next: res => {
          let count = 0;
          this.accommodationList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        }
      });

  }

  setSearchContent(el: HTMLDivElement, option: string, type: string): void {
    el.classList.contains('hidden') ?  el.classList.remove('hidden') : el.classList.add('hidden');
    type === 'type' ? this.typeOption = option : this.cityOption = option;
  }
}
