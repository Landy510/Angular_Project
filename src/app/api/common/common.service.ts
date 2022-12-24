import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { city } from './types';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: ApiService) { }

  getAllCityList(): Observable<city[]> {
    return this.api.get('/v2/Basic/City?%24format=JSON');
  }
}
