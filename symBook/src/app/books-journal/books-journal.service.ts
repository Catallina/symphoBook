import { JournalBookDetailsFacade } from './store/books-journal/books-journal.facade';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ApiEndpointsUrl } from '@syb/shared/api.constants';

import { BookListModel } from '@syb/shared/models/book-list.model';
// import { BooksJournalStore } from '@syb/books-journal/store/books-journal.store';

@Injectable({
  providedIn: 'root'
})
export class BooksJournalService {

  constructor(
    private http: HttpClient,
    private bookJournalFacade: JournalBookDetailsFacade,
    //private booksJournalStore: BooksJournalStore,
  ) { }

  public mapToBookDetailsPayload(bookList: any): BookListModel[] {
    const mappedList: BookListModel[] = [];

    if (bookList && bookList.length > 0) {
      bookList.forEach(book => {
        mappedList.push(
          new BookListModel({
            id: book.id,
            title: book.title,
            author: book.author,
            photo: book.photo,
          })
        )
      });
    }

    return mappedList;
  }


  public getBooksJournal$(userId: string): Observable<BookListModel[]> {
    return this.http
      .get<any>(environment.apiUrl + ApiEndpointsUrl.journalBook + '?uid=' + userId)
      .pipe(
        map(response => {
          return this.mapToBookDetailsPayload(response);
        })
      );
  }

  // public fetchBookJournalDetails(userId: string): void {
  //   this.getBooksJournal$(userId)
  //   .subscribe((bookList: BookListModel[]) => {
  //     if (bookList) {
  //       this.bookJournalFacade.getBookDetails(bookList);
  //       this.booksJournalStore.booksJournalDetails = bookList;
  //     }
  //   });
  // }

  public deleteAllBooks$(userId: string): Observable<[]> {
    return this.http.delete<[]>(environment.apiUrl + ApiEndpointsUrl.journalDelete + `?uid=${userId}`);
  }
}
