import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BookListModel } from '@syb/shared/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import {
  BookListItem,
} from '@syb/books/interfaces/book-details-payload.interface';
import { BookGroupDetails } from '@syb/books/interfaces/book-group-details.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient,
  ) {}

  public mapToBookList(bookList: any): BookListModel[] {
    const mappedList: BookListModel[] = [];

    if (bookList) {
      for ( const element in bookList) {
        if (bookList.hasOwnProperty(element)) {
          mappedList.push(
            new BookListModel({
              element,
              id: bookList[element].id,
              title: bookList[element].title,
              description: bookList[element].description,
              imageUrl: bookList[element].imageUrl,
              author: bookList[element].author,
              date: bookList[element].date,
              url: bookList[element].url,
              urls: this.mapUrls(bookList[element].urls),
            })
          );
        }
      }
    }

    return mappedList;
  }

  public mapUrls(urls: any): string[] {
    const mappedUrl = [];

    if (urls) {
      for ( const element in urls) {
          if (urls.hasOwnProperty(element)) {
            mappedUrl.push(
              { element, url: urls[element]}
            );
        }
      }
    }
    return mappedUrl;
  }

  public mapToBookGroup(data: any): BookGroupModel[] {
    const mappedGroup: BookGroupModel[] = [];

    if (data && data.attributes && data.attributes.group) {
      mappedGroup.push(
        new BookGroupModel({
          title: data.attributes.group.title,
          bookList: this.mapToBookList(data.attributes.group.bookList),
        })
      );
    }
    return mappedGroup;
  }

  public getBook$(): Observable<BookGroupModel[]> {
    return this.http.get<any>('https://symphobook.firebaseio.com/books.json')
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
