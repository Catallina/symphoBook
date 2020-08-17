import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterPlayerPage } from './footer-player.page';

const routes: Routes = [
  {
    path: '',
    component: FooterPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterPlayerPageRoutingModule {}
