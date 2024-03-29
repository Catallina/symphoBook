import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistPage } from './wishlist.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistPage,
  },
  {
    path: ':bookId',
    loadChildren: () => import('@syb/books/discover/book-detail/book-detail.module').then(m => m.BookDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistPageRoutingModule {}
