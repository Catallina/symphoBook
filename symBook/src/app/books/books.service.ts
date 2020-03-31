import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { BookModel } from '@syb/books/books.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  public mapToBook(data: any): BookModel[] {
    const details: BookModel[] = [];

    if (data && data.attributes && data.attributes.books.length > 0) {
      data.attributes.books.forEach((book: BookModel) => {
        details.push(
          new BookModel({
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

    return details;
  }

  public getBook$(): Observable<BookModel[]> {
    return this.http.get<any>('assets/mocks/book.json')
      .pipe(
        map(response => this.mapToBook(response.data))
      );
  }

}
