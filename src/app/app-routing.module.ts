import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@views/Home/home.component';
import { SearchComponent } from '@views/Search/search.component';
const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '',
    component: HomeComponent
    // loadChildren: () => import('@views/Home/home.module').then(module => module.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
