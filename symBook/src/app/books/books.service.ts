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

  constructor(private http: HttpClient) {}

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
            })
          );
        }
      }
    }

    return mappedList;
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

  files: any = [
    { 
      url: 'https://ia802602.us.archive.org/9/items/pride_and_prejudice_librivox/prideandprejudice_01-03_austen.mp3', 
      name: 'Pride and Prejudice by Jane Austen'
    },
    {
      url: 'https://ia600305.us.archive.org/17/items/adventures_holmes/adventureholmes_01_doyle_64kb.mp3',
      name: 'The Adventures of Sherlock Holmes by Doyle, Sir Arthur Conan'
    },
    { 
      url: 'https://ia800301.us.archive.org/14/items/art_of_war_librivox/art_of_war_01-02_sun_tzu.mp3',
      name: 'Art of war by Sun Tzu'
    }
  ];

  getFiles() {
    return of(this.files);
  }

}
