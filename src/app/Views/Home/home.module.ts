import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SwiperModule } from 'swiper/angular';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SwiperModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
