import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { concatMap } from 'rxjs';

import { HomeService } from '@api/home/home.service';
import { ScenicSpot, ActivityList, DelicacyList, AccommodationList } from '@api/home/types';
@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        concatMap(res => {
          switch (res['category']) {
            case 'ScenicSpot':
              return this.homeService.getEntertainmentData<ScenicSpot>(res['category'], res['city']);
            case 'Activity':
              return this.homeService.getEntertainmentData<ActivityList>(res['category'], res['city']);
            case 'Restaurant':
              return this.homeService.getEntertainmentData<DelicacyList>(res['category'], res['city']);
            case 'Hotel':
              return this.homeService.getEntertainmentData<AccommodationList>(res['category'], res['city']);
            default:
              return this.homeService.getEntertainmentData<ScenicSpot>(res['city']);
          }
        })
      )
      .subscribe(res => console.log(res));
  }

}
