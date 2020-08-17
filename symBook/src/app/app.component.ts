import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from '@syb/auth/auth.service';

@Component({
  selector: 'syb-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private render: Renderer2,
    ) {
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
