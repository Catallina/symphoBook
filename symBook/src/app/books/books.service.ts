import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { BookListModel } from '@syb/books/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  public mapToBookList(bookList: any): BookListModel[] {
    const mappedList: BookListModel[] = [];

    if (bookList && bookList.length > 0) {
      bookList.forEach((book: BookListModel) => {
        mappedList.push(
          new BookListModel({
            id: book.id,
            title: book.title,
            description: book.description,
            imageUrl: book.imageUrl,
            author: book.author,
            date: book.date
          })
        );
      });
    }

    return mappedList;
  }

  public mapToBookGroup(data: any): BookGroupModel[] {
    const mappedGroup: BookGroupModel[] = [];

    if (data && data.attributes && data.attributes.group.length > 0) {
      data.attributes.group.forEach((group: BookGroupModel) => {
        mappedGroup.push(
          new BookGroupModel({
            title: group.title,
            bookList: this.mapToBookList(group.bookList),
          })
        );
      });
    }
    return mappedGroup;
  }

  public getBook$(): Observable<BookGroupModel[]> {
    return this.http.get<any>('assets/mocks/book.json')
      .pipe(
        map(response => {
          return this.mapToBookGroup(response.data);
        })
      );
  }

}
