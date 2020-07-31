export class ProfileModel {
  aboutMe: string;
  birthday: string;
  description: string;
  email: string;
  favoriteBook: string[];
  id: number;
  jobTitle: string;
  name: string;
  passions: string;
  phoneNumber: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
