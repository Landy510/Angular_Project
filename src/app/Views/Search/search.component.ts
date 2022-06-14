import { Component, OnInit } from '@angular/core';

import { testInfo } from './type';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  testObj: testInfo = { name: '' };

  constructor() {
    this.testObj = { name: '123' };
  }

  ngOnInit(): void {
  }

  testFnc() {

  }

}
