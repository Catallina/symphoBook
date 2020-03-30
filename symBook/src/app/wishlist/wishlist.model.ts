export class Wishlist {
  id: string;
  placeId: string;
  userId: string;
  placeTitle: string;
  placeImage: string;
  firstName: string;
  lastName: string;
  guestNumber: number;
  bookedFrom: Date;
  bookedTo: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
