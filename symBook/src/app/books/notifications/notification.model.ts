export class NotificationModel {
  message: string;
  titleBook: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
