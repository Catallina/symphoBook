import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastBookPageRoutingModule } from './last-book-routing.module';

import { LastBookPage } from './last-book.page';
import { StoreModule } from '@ngrx/store';
import { StoreConstants } from '@syb/shared/constants/store.constants';
import { appReducers } from '@syb/store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { BookDetailsEffects } from '@syb/store/book-details/book-details.effects';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LastBookPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastBookPageRoutingModule,
    RouterModule.forChild(routes),

    StoreModule.forFeature( StoreConstants.booksStore, appReducers ),
    EffectsModule.forFeature([
      BookDetailsEffects,
    ]),
  ],
  declarations: [LastBookPage]
})
export class LastBookPageModule {}
