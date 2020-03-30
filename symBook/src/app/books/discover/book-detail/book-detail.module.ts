import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookDetailPage } from '@syb/books/discover/book-detail/book-detail.page';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: BookDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BookDetailPage,
    CreateWishlistComponent
  ],
  entryComponents: [
    CreateWishlistComponent
  ]
})
export class BookDetailPageModule {}
