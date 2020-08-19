import { BookListModel } from '@syb/shared/models/book-list.model';

export class BookGroupModel {
  title: string;
  id: string;
  author: string;
  photo: string;
  url: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
