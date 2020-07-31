import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import {
  BookDetailsPayload,
  BookGroupItem,
  BookListItem,
} from '@syb/books/interfaces/book-details-payload.interface';
import { BookGroupDetails } from '@syb/books/interfaces/book-group-details.interface';

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

  // public buildSaveWishBook(book: BookGroupDetails): BookDetailsPayload {
  //   return {
  //     data: {
  //       attributes: {
  //         group: this.mapToBookListPayload(book.group),
  //       }
  //     }
  //   };
  // }

  // public mapToBookListPayload(bookGroup: BookGroupModel[]): BookGroupItem[] {
  //   return bookGroup.map((group: BookGroupModel) => {
  //     return  {
  //       title: group.title,
  //       bookList: this.mapToBookDetailsPayload(group.bookList),
  //     };
  //   });
  // }

  public mapToBookDetailsPayload(list: BookListModel): BookListItem {
    return {
      id: list.id,
      author: list.author,
      date: list.date,
      description: list.description,
      imageUrl: list.imageUrl,
      title: list.title,
    };
  }

  public storeWishBook$(bookList: BookListModel): Observable<BookListItem> {
    const bookDetailsPayload = this.mapToBookDetailsPayload(bookList);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/vnd.api+json',
      })
    };

    return this.http.post<BookListItem>('https://symphobook.firebaseio.com/book.json', bookDetailsPayload)
    .pipe(
      map(response => response)
    );
  }

}
