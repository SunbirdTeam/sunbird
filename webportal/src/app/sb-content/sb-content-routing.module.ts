import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {SearchComponent} from './search/search.component';

/**
 * The HomeRoutingModule provides the routes for the Home module.
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'content/search', component: SearchComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
