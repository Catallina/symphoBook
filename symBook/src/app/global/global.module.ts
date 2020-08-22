import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { bookReducers } from './book.reducers';
import { SharedModule } from '@syb/shared/shared.module';
import { StoreConstants } from '@syb/shared/constants/store.constants';
import { BookDetailsEffects } from './book-details/book-details.effects';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,

    SharedModule,

    StoreModule.forFeature( StoreConstants.booksStore, bookReducers ),
    EffectsModule.forFeature([
      BookDetailsEffects,
    ]),
  ],
  exports: [

  ],
  providers: []
})
export class GlobalModule { }
