import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

import { ProfileModel } from '@syb/profile/profile.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'syb-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() profileDetails: ProfileModel;
  @Input() userId: string;

  public isBtnDisabledByInput: boolean = true;

  public profileDetailsEdit: ProfileModel;

  public 

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.profileDetailsEdit = JSON.parse(JSON.stringify(this.profileDetails));
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public onChangeName(): boolean {
    return this.profileDetailsEdit.name === this.profileDetails.name;
  }

  public onChangeBirthday(): boolean {
    return this.profileDetailsEdit.birthday === this.profileDetails.birthday;
  }

  public onChangeDescription(): boolean {
    return this.profileDetailsEdit.description === this.profileDetails.description;
  }

  public onChangeLove(): boolean {
    return this.profileDetailsEdit.love === this.profileDetails.love;
  }

  public onInputsChange(): void {
    this.isBtnDisabledByInput = this.onChangeName() && this.onChangeDescription() && this.onChangeLove() && this.onChangeBirthday();
  }

  public updateProfile(): void {
    this.profileService.updateProfile$(this.userId, this.profileDetailsEdit);
    window.location.reload()
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 1000)
    this.isBtnDisabledByInput = true;
  }

}
