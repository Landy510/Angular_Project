import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    SwiperModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
