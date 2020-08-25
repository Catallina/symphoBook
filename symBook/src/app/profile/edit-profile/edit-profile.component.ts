import { ProfileStore } from './../store/profile.store';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileModel } from '@syb/profile/profile.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'syb-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() profileDetails: ProfileModel;
  @Input() userId: string;
  @Input() modalCtrl: ModalController;

  @Output() public idUpdate = new EventEmitter<any>();

  public isAlive = false;

  public isBtnDisabledByInput: boolean = true;

  public profileDetailsEdit: ProfileModel;

  constructor(
    private profileService: ProfileService,
    private profileStore: ProfileStore,
  ) { 
    this.isAlive = true;
  }

  ngOnInit() {
    this.profileDetailsEdit = JSON.parse(JSON.stringify(this.profileDetails));
  }

  ngOnDestroy(): void {
    this.isAlive = false;
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
    this.profileService.updateProfile$(this.userId, this.profileDetailsEdit).subscribe((isUpdate) => {
      this.profileStore.profileDetails = this.profileDetailsEdit;
      this.modalCtrl.dismiss();
    });
    this.isBtnDisabledByInput = true;
  }

  public openCalendar() {
    
  }

}
