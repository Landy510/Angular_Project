import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { City } from './types';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  cityList$ = new BehaviorSubject<City[]>([]);

  constructor(private api: ApiService) { }

  getAllCities(): Observable<City[]> {
    return this.api.get<City[]>('/v2/Basic/City');
  }
}
