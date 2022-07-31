import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  // 直接綜合 ScenicSpot, Activity, Restaurant, Hotel 四個類別的 api
  getEntertainmentData<T>(category = 'ScenicSpot', city = ''): Observable<T> {
    return city ? this.api.get(`/v2/Tourism/${category}/${city}`) : this.api.get(`/v2/Tourism/${category}`);
  }

}
