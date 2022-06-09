import { ApiService } from './../../api/api.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot')
    .subscribe(res => console.log('get all tourist spots', res))
  }

}
