import { Component, OnInit } from '@angular/core';

import SwiperCore, { Pagination, SwiperOptions } from 'swiper';

import { HomeService } from '../../api/home/home.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: {
      clickable: true,
      el: '.custom-pagination'
    },
    scrollbar: { draggable: true },
  };

  bannerImages: Array<string> =  [
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2815&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2839&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2887&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2854&w=1280&h=960',
    'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2834&w=1280&h=960',
  ];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllScenicSpots()
      .subscribe(res => console.log('scenic spot', res));
  }

}
