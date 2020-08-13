import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { BookDetailsEffects } from '@syb/books/store/book-details/book-details.effects';
import { BookReducers } from '@syb/books/store/book.reducers';
import { BooksPage } from '@syb/books/books.page';
import { BooksRoutingModule } from '@syb/books/books-routing.module';
import { StoreConstants } from '@syb/shared/constants/store.constants';
import { mediaStateReducer } from '@syb/books/store/audio/audio.reducer';

@NgModule({
  declarations: [
    BooksPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    BooksRoutingModule,

    StoreModule.forFeature( StoreConstants.booksStore, BookReducers ),
    EffectsModule.forFeature([
      BookDetailsEffects,
    ]),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
})
export class PlacesPageModule {}
