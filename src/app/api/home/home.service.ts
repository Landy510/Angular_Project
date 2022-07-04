import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { ScenicSpot, ActivityList, DelicacyList } from './types';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  getAllScenicSpots(): Observable<Array<ScenicSpot>> {
    return this.api.get('/v2/Tourism/ScenicSpot');
  }

  getAllActivityList(): Observable<Array<ActivityList>> {
    return this.api.get('/v2/Tourism/Activity');
  }

  getAllDelicacyList(): Observable<Array<DelicacyList>> {
    return this.api.get('/v2/Tourism/Restaurant');
  }

}
