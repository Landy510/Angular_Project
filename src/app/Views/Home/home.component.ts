import { Component, OnInit, ViewChild } from '@angular/core';

import { map } from 'rxjs';
import SwiperCore, { Pagination, SwiperOptions, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

import { HomeService } from '@api/home/home.service';
import { ScenicFilter } from './types';

SwiperCore.use([Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('swiper') swiper!: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
      el: '.custom-pagination'
    }
  };

  bannerImages: Array<string> =  [
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2815&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2839&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2887&w=1280&h=960',
  ];

  secondBlockImageFirstRow: Array<ScenicFilter> = [];

  secondBlockImageSecondRow: Array<ScenicFilter> = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllScenicSpots()
      .pipe(
        map(res => {
          const temArray: Array<ScenicFilter> = [];
          res.forEach(item => {
            if (temArray.length <= 6 && item.Picture.PictureUrl1) {
              temArray.push(
                { title: item.ScenicSpotName, picUrl: item.Picture.PictureUrl1 }
              );
            }
          });
          return temArray;
        })
      )
      .subscribe({
        next: res => {
          res.forEach((item, index) => {
            if (index <= 2) this.secondBlockImageFirstRow.push(item);
            else this.secondBlockImageSecondRow.push(item);
          });
        },
        error: err => console.log('scenic error', err)
      });
  }
}
