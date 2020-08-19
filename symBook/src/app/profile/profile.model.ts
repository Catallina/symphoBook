export class ProfileModel {
  id: string;
  love: string;
  birthday: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;

  favoriteBook: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
