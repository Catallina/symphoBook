export class BookListModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: Date;
  url: string;
  urls: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
