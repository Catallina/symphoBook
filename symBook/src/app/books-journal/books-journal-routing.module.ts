import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksJournalPage } from './books-journal.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: BooksJournalPage,
    children: [
      {
        path: 'details',
        children: [
          {
            path: '',
            loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
          },
          {
            path: ':bookId',
            loadChildren: () => import('@syb/books/discover/book-detail/book-detail.module').then(m => m.BookDetailPageModule)
          }
        ]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksJournalPageRoutingModule {}
