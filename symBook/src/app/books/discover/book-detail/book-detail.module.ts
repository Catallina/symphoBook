import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookDetailPage } from '@syb/books/discover/book-detail/book-detail.page';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';
import { SharedModule } from '@syb/shared/shared.module';

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
    RouterModule.forChild(routes),
  ],
  declarations: [
    BookDetailPage,
    CreateWishlistComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  entryComponents: [
    CreateWishlistComponent,
  ]
})
export class BookDetailPageModule {}
