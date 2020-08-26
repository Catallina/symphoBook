import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { Platform, NavController, ActionSheetController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'syb-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() getText = new EventEmitter<string>();

  srcImage: string;
  OCRAD: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.getPicture();
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.then((actionEl) => {
      actionEl.present();
    });
  }

  getPicture() {
    Plugins.Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 300,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData.base64String}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.then((loaderEl) => {
      loaderEl.present();
        (<any>window).OCRAD(document.getElementById('image'), text => {
          loaderEl.dismiss();
          this.getText.emit(text);
        });
    });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
