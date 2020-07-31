import { BookListModel } from '@syb/shared/models/book-list.model';

export class BookGroupModel {
  title: string;
  bookList: BookListModel[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
