import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksJournalPage } from './books-journal.page';

const routes: Routes = [
  {
    path: '',
    component: BooksJournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksJournalPageRoutingModule {}
