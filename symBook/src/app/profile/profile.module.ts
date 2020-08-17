import { SharedModule } from '@syb/shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from '@syb/profile/profile-routing.module';
import { ProfilePage } from '@syb/profile/profile.page';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,

    ProfilePageRoutingModule,

    SharedModule,
  ],
  declarations: [
    ProfilePage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ProfilePageModule {}
