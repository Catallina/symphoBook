import { SharedModule } from '@syb/shared/shared.module';
import { FooterComponent } from '@syb/shared/footer/footer.component';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IonicModule } from '@ionic/angular';

import { BookDetailsEffects } from '@syb/store/book-details/book-details.effects';

import { BooksPage } from '@syb/books/books.page';
import { BooksRoutingModule } from '@syb/books/books-routing.module';
import { StoreConstants } from '@syb/shared/constants/store.constants';
import { appReducers } from '@syb/store/app.reducers';

@NgModule({
  declarations: [
    BooksPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    BooksRoutingModule,

    //SharedModule,

    StoreModule.forFeature( StoreConstants.booksStore, appReducers ),
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
