import { Observable } from 'rxjs';
import { Credentials } from './interface/credentials.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';

import { AuthService } from '@syb/auth/auth.service';
import { TypeLogin } from '@syb/shared/enums/login.enums';
import { environment } from '@env/environment';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';

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
    private fb: Facebook,
    public http: HttpClient,
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
  }

  authenticate(credentials: Credentials) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();

        if (this.isLogin) {
          const email = credentials.Email;
          const password = credentials.Password;

          this.authService.login$(email, password).subscribe(success => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigate([environment.defaultUrl]);
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
          this.authService.createAccount$(credentials).subscribe(success => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.alertCtrl.create({
              header: 'Authentication success',
              message: 'Go to Login',
              buttons: ['Okay']})
              .then((alertEl) => alertEl.present());
          }, (errRes) => {
            loadingEl.dismiss();
            const code = errRes.error;
            let message = 'Could not sign you up, please try again.';
            if (code === 'Email already exists') {
              message = 'This email address exists already!';
            } else if (code === 'Invalid Phone Number') {
              message = 'This phone number is not correct.';
            } else if (code === 'Password is too short') {
              message = 'This password is not correct.';
            }
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

    const credentials: Credentials = {
      Email: form.value.email,
      Password: form.value.password,
      PhoneNumber: form.value.phoneNumber,
      DisplayName: form.value.name,
    };

    this.authenticate(credentials);

    form.resetForm();
  }

  onLogWithFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']})
      .then((alertEl) => alertEl.present());
  }
}
