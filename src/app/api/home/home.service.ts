import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service'
import { ScenicSpot } from './types'
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  getAllScenicSpots(): Observable<Array<ScenicSpot>> {
    return this.api.get('/v2/Tourism/ScenicSpot')
  }
}
