import { FooterPlayerPage } from './footer-player/footer-player.page';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from '@syb/app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FooterPlayerPage,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterPlayerPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class SharedModule { }
