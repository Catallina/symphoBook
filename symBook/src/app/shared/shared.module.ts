import { FooterPlayerPage } from './footer-player/footer-player.page';
import { FooterComponent } from '@syb/shared/footer/footer.component';
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
    //FooterComponent,
    FooterPlayerPage,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
  ],
  exports: [
    //FooterComponent,
    FooterPlayerPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class SharedModule { }
