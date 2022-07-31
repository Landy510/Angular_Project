import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { CommonService } from '@api/common/common.service';
import { HomeService } from '@api/home/home.service';
import { ScenicSpot, ActivityList, DelicacyList, AccommodationList } from '@api/home/types';
import { City } from '@api/common/types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ElementRef) dropDownCompo!: ElementRef;

  selectedValue: string = '';

  // typeList: string[] = [
  //   '旅遊景點',
  //   '觀光活動',
  //   '美食品嚐',
  //   '住宿推薦',
  // ];

  typeList = [
    {
      name: '旅遊景點',
      value: 'ScenicSpot'
    },
    {
      name: '觀光活動',
      value: 'Activity'
    },
    {
      name: '美食品嚐',
      value: 'Restaurant'
    },
    {
      name: '住宿推薦',
      value: 'Hotel'
    },
  ];

  cityList: City[] = [];

  scenicList: ScenicSpot[] = [];

  activityList: ActivityList[] = [];

  delicacyList: DelicacyList[] = [];

  accommodationList: AccommodationList[] = [];

  typeOption: string = '';

  cityOption: string = '';

  searchForm = this.fb.group({
    search: [''],
    type: [''],
    city: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
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

    this.getScenicSpot();
    this.getActivity();
    this.getDelicacy();
    this.getAccommodation();


    this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(res => {
        const result = this.cityList.find(item => item.CityName === res);
        if (result) this.router.navigate([`/generic`], { queryParams: { category: 'ScenicSpot', city: result.City } });
      });

    this.searchForm.get('type')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(res => console.log(res));

    this.searchForm.get('city')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(res => console.log(res));
  }

  setSearchContent(el: HTMLDivElement, option: string, type: string): void {
    el.classList.contains('hidden') ?  el.classList.remove('hidden') : el.classList.add('hidden');
    type === 'type' ? this.typeOption = option : this.cityOption = option;
  }

  getScenicSpot(city = ''): void {
    this.homeService.getEntertainmentData<ScenicSpot[]>('ScenicSpot', city)
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
  }

  getActivity(city = ''): void {
    this.homeService.getEntertainmentData<ActivityList[]>('Activity', city)
      .subscribe({
        next: res => {
          let count = 0;
          this.activityList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        },
        error: err => console.log('scenic error', err)
      });
  }

  getDelicacy(city = ''): void {
    this.homeService.getEntertainmentData<DelicacyList[]>('Restaurant', city)
      .subscribe({
        next: res => {
          let count = 0;
          this.delicacyList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        },
        error: err => console.log('scenic error', err)
      });
  }

  getAccommodation(city = ''): void {
    this.homeService.getEntertainmentData<AccommodationList[]>('Hotel', city)
      .subscribe({
        next: res => {
          let count = 0;
          this.accommodationList = res.filter(item => {
            if (item.Picture.hasOwnProperty('PictureUrl1')) count++; // 判斷來源的資料是否有提供圖片連結
            return item.Picture.hasOwnProperty('PictureUrl1') && count <= 3;
          });
        },
        error: err => console.log('scenic error', err)
      });
  }

}
