import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ChildComponent } from './child.component'

@NgModule({
  declarations: [ChildComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  exports: [
    ChildComponent
  ]
})
export class ChildModule { }
