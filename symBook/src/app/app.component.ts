import { BookGroupModel } from './books/models/book-group.model';
import { Component, ElementRef, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from '@syb/auth/auth.service';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { takeWhile } from 'rxjs/operators';
import { AudioService } from './books/audio/audio.service';

@Component({
  selector: 'syb-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  private isAlive = false;

  public currentFile: any;
  public bookList: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private render: Renderer2,
    private bookFacade: BookDetailsFacade,
    private audioService: AudioService,
    ) {
    this.isAlive = true;
    this.initializeApp();
  }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
    //this.profileStore.reset();
    //this.bookFacade.reset();
    this.audioService.stop();

    this.router.navigateByUrl('/auth');
  }

  public toggleDarkTheme(event) {
    if (event.detail.checked) {
      //document.body.setAttribute('color-theme', 'dark');
      this.render.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      //document.body.setAttribute('color-theme', 'light');
      this.render.setAttribute(document.body, 'color-theme', 'light');
    }
  }

}
