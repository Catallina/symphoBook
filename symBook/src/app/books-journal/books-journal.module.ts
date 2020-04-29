import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksJournalPageRoutingModule } from './books-journal-routing.module';

import { BooksJournalPage } from './books-journal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksJournalPageRoutingModule
  ],
  declarations: [BooksJournalPage]
})
export class BooksJournalPageModule {}
