import { appReducers } from './../store/app.reducers';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BooksJournalPageRoutingModule } from './books-journal-routing.module';

import { BooksJournalPage } from './books-journal.page';
import { StoreConstants } from '@syb/shared/constants/store.constants';
import { JournalBookDetailsEffects } from '@syb/books-journal/store/books-journal/books-journal.effects';
import { JournalReducers } from '@syb/books-journal/store/books-journal.reducers';
import { GlobalModule } from '@syb/global/global.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BooksJournalPageRoutingModule,

    StoreModule.forFeature( StoreConstants.journalStore, JournalReducers ),
    EffectsModule.forFeature([
      JournalBookDetailsEffects,
    ]),

    GlobalModule,
  ],
  declarations: [BooksJournalPage]
})
export class BooksJournalPageModule {}
