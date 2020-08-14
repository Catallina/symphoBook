import { Observable } from 'rxjs';
import { Credentials } from './interface/credentials.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';

import { AuthService } from '@syb/auth/auth.service';
import { TypeLogin } from '@syb/shared/enums/login.enums';
import { environment } from '@env/environment';

import * as firebase from 'firebase';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  public typeLog: TypeLogin;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'SymphoBook' })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/auth');
      }, 500);
    });

    // if (!firebase.apps.length) {
    //   firebase.initializeApp(environment.firebase);
    // }

  }

  authenticate(credentials: Credentials) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<any>;

        if (this.isLogin) {
          console.warn('Login', this.isLogin);

          this.authService.login$(credentials.Email, credentials.Password).subscribe(success => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/books');
            //this.router.navigate([environment.defaultUrl]);
          }, errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          });
        } else {
          console.warn('SignUp', this.isLogin);

          this.authService.createAccount$(credentials).subscribe(success => {

            this.isLoading = false;
            loadingEl.dismiss();
            console.warn('Aiiiici');
            
            this.router.navigateByUrl('/books');

            //this.router.navigate([environment.defaultUrl]);
          }, errRes => {
            loadingEl.dismiss();
            // const code = errRes.error.error.message;
            const message = 'Could not sign you up, please try again.';
            // if (code === 'EMAIL_EXISTS') {
            //   message = 'This email address exists already!';
            // } else if (code === 'EMAIL_NOT_FOUND') {
            //   message = 'E-Mail address could not be found.';
            // } else if (code === 'INVALID_PASSWORD') {
            //   message = 'This password is not correct.';
            // }
            this.showAlert(message);
          });
        }
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    const credentials: Credentials = {
      Email: form.value.email,
      Password: form.value.password,
      PhoneNumber: form.value.phoneNumber,
      DisplayName: form.value.name,
    };


    this.authenticate(credentials);
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']})
      .then((alertEl) => alertEl.present());
  }
}
