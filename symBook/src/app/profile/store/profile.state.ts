import { ProfileModel } from '@syb/profile/profile.model';

export interface ProfileState {
  profileDetails: ProfileModel;
  profileImage: string | ArrayBuffer;
  favoriteBook: string[],
}

export const initialProfileState: ProfileState = {
  profileDetails: null,
  profileImage: '',
  favoriteBook: null,
};
