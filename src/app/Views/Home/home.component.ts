import { Component, OnInit, ViewChild } from '@angular/core';

import SwiperCore, { Pagination, SwiperOptions, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

import { HomeService } from '../../api/home/home.service';

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

  swiperBreakpoint1 = {
    414: {
      slidesPerView: 2,
    },
    769: {
      slidesPerView: 1.5,
      slidesPerGroup: 1
    },
    1024: {
      slidesPerView: 2.5,
    }
  };

  swiperBreakpoint = {
    768: {
      slidesPerView: 2,
      centeredSlides: false
    },
    1024: {
      slidesPerView: 3,
      centeredSlides: false
    }
  };

  bannerImages: Array<string> =  [
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2815&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2839&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2887&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2854&w=1280&h=960',
  ];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllScenicSpots()
      .subscribe({
        next: res => console.log('scenic spot', res),
        error: err => console.log('scenic error', err)
      });
  }
}
