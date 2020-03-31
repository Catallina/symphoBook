import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { BookDetailsEffects } from '@syb/books/store/book-details/book-details.effects';
import { BookReducers } from '@syb/books/store/book.reducers';
import { BooksPage } from '@syb/books/books.page';
import { BooksRoutingModule } from '@syb/books/books-routing.module';
import { StoreConstants } from '@syb/shared/constants/store.constants';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BooksRoutingModule,

    StoreModule.forFeature( StoreConstants.booksStore, BookReducers ),
    EffectsModule.forFeature([
      BookDetailsEffects,
    ]),
  ],
  declarations: [
    BooksPage
  ]
})
export class PlacesPageModule {}
