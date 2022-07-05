import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { ScenicSpot, ActivityList, DelicacyList, AccommodationList } from './types';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  getAllScenicSpots(): Observable<ScenicSpot[]> {
    return this.api.get('/v2/Tourism/ScenicSpot');
  }

  getAllActivityList(): Observable<ActivityList[]> {
    return this.api.get('/v2/Tourism/Activity');
  }

  getAllDelicacyList(): Observable<DelicacyList[]> {
    return this.api.get('/v2/Tourism/Restaurant');
  }

  getAllAccommodationList(): Observable<AccommodationList[]> {
    return this.api.get('/v2/Tourism/Hotel');
  }

}
