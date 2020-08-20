import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastBookPageRoutingModule } from './last-book-routing.module';

import { LastBookPage } from './last-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastBookPageRoutingModule
  ],
  declarations: [LastBookPage]
})
export class LastBookPageModule {}
