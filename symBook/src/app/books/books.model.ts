export class BookModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
