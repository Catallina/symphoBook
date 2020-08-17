import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterPlayerPageRoutingModule } from './footer-player-routing.module';

import { FooterPlayerPage } from './footer-player.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterPlayerPageRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [FooterPlayerPage]
})
export class FooterPlayerPageModule {}
