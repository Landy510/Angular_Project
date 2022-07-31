import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GenericComponent } from './generic.component';

const routes: Routes = [
  {
    path: '',
    component: GenericComponent
  },
];


@NgModule({
  declarations: [
    GenericComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class GenericModule { }
