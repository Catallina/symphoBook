import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiscoverPage } from '@syb/books/discover/discover.page';
import { FooterComponent } from '@syb/shared/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  declarations: [
    DiscoverPage,
    FooterComponent,
  ],
  entryComponents: []
})
export class DiscoverPageModule {}
