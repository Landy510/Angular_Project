import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { HomeService } from '@api/home/home.service';
import { ScenicSpot, ActivityList } from '@api/home/types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ElementRef) dropDownCompo!: ElementRef;

  typeList: string[] = [
    '旅遊景點',
    '觀光活動',
    '美食品嚐',
    '住宿推薦',
  ];

  cityList: string[] = [
    '基隆市',
    '台北市',
    '新北市',
    '桃園縣',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '台中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '台南市',
    '高雄市',
    '屏東縣',
    '台東縣',
    '花蓮縣',
    '宜蘭縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ];

  scenicList: ScenicSpot[] = [];

  activityList: ActivityList[] = [];

  typeOption: string = '';

  cityOption: string = '';

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
  }

  ngOnInit(): void {
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
  }

  toggle(el: HTMLDivElement): void {
    el.classList.contains('hidden') ?  el.classList.remove('hidden') : el.classList.add('hidden');
  }

  setSearchContent(el: HTMLDivElement, option: string, type: string): void {
    el.classList.contains('hidden') ?  el.classList.remove('hidden') : el.classList.add('hidden');
    type === 'type' ? this.typeOption = option : this.cityOption = option;
  }
}
