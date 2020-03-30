import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BooksPage } from '@syb/books/books.page';
import { BooksRoutingModule } from '@syb/books/books-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BooksRoutingModule
  ],
  declarations: [BooksPage]
})
export class PlacesPageModule {}
