import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../api/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllScenicSpots()
      .subscribe(res => console.log(res));
  }

  testFnc () {

  }

}
