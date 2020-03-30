export class Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
  userId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
