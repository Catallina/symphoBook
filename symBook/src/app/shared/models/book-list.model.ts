export class BookListModel {
  id: string;
  title: string;
  description: string;
  photo: string;
  author: string;
  urls: string[];
  chapters: string;
  language: string;
  year: string;
  totalTime: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
