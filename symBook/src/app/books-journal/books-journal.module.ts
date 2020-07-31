import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksJournalPageRoutingModule } from './books-journal-routing.module';

import { BooksJournalPage } from './books-journal.page';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BooksJournalPageRoutingModule,
  ],
  declarations: [BooksJournalPage]
})
export class BooksJournalPageModule {}
