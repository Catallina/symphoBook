import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksPage } from '@syb/books/books.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: BooksPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('@syb/books/discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: ':bookId',
            loadChildren: () => import('@syb/books/discover/book-detail/book-detail.module').then(m => m.BookDetailPageModule)
          }
        ]
      },
      {
        path: 'new-book',
        children: [
          {
            path: '',
            loadChildren: () => import('@syb/books/new-book/new-book.module').then(m => m.NewBookPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/books/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/books/tabs/discover',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
