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
import { environment } from '@env/environment';
import { ApiEndpointsUrl } from '@syb/shared/api.constants';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient,
  ) {}

  public responseData = [
      {
        "id": "5f3a89a2cbbb2635461cca2e",
        "title": "Pride and Prejudice",
        "author": "Jane Austin",
        "photo": "http://mcdn.elefant.ro/mnresize/1500/1500/images/33/231533/pride-and-prejudice_1_fullsize.jpg",
        "mp3Url": "https://ia802602.us.archive.org/9/items/pride_and_prejudice_librivox/prideandprejudice_01-03_austen.mp3"
      },
      {
        "id": "2",
        "title": "The Adventures of Sherlock Holmes",
        "author": "Arthur Conan Doyle",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Adventures_of_sherlock_holmes.jpg",
        "mp3Url": "https://ia600305.us.archive.org/17/items/adventures_holmes/adventureholmes_01_doyle_64kb.mp3"
      },
      {
        "id": "25",
        "title": "Art of war",
        "author": "Sun Tzu",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Bamboo_book_-_closed_-_UCR.jpg",
        "mp3Url": "https://ia800301.us.archive.org/14/items/art_of_war_librivox/art_of_war_01-02_sun_tzu.mp3"
      }
  ]


  public responseBookDetails = {
    "id":"5f3a89a2cbbb2635461cca2e",
    "photo":"https://m.media-amazon.com/images/I/512t6Ihv02L.jpg",
    "title":"Dorothy and the Wizard in Oz",
    "description":"DescriptionDorothy and the Wizard in Oz is the fourth book set in the Land of Oz written by L. Frank Baum and illustrated by John R. Neill. It was published on June 18, 1908 and reunites Dorothy with the humbug Wizard from The Wonderful Wizard of Oz. This is one of only two of the original fourteen Oz books",
    "chapters":"6",
    "language": "English",
    "year": "1908",
    "mp3": ["https://ia600200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_01_baum.mp3","https://ia800200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_02_baum.mp3","https://ia800200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_03_baum.mp3","https://ia800200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_04_baum.mp3","https://ia600200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_05_baum.mp3","https://ia800200.us.archive.org/23/items/dorothy_wizard_oz_librivox/dorothywiz_06_baum.mp3"],
    "totalTime": "4:15:44",
    "author":"L. Frank Baum",
  };


  public mapToBookList(bookList: any): BookGroupModel[] {
    const mappedList: BookGroupModel[] = [];

    if (bookList && bookList.length > 0) {
      bookList.forEach(book => {
        mappedList.push(
          new BookGroupModel({
            id: book.id,
            title: book.title,
            author: book.author,
            photo: book.photo,
            url: book.mp3Url,
          })
        )
      });
    }

    return mappedList;

    // if (bookList) {
    //   for ( const element in bookList) {
    //     if (bookList.hasOwnProperty(element)) {
    //       mappedList.push(
    //         new BookListModel({
    //           element,
    //           id: bookList[element].id,
    //           title: bookList[element].title,
    //           description: bookList[element].description,
    //           imageUrl: bookList[element].imageUrl,
    //           author: bookList[element].author,
    //           date: bookList[element].date,
    //           url: bookList[element].url,
    //           urls: this.mapUrls(bookList[element].urls),
    //         })
    //       );
    //     }
    //   }
    // }
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

  public mapToBookDetails(data: any): BookListModel {
    let details: BookListModel = null;

    if (data) {
      details = new BookListModel({
        id: data.id,
        title: data.title,
        description: data.description,
        photo: data.photo,
        author: data.author,
        urls: data.mp3,
        chapters: data.chapters,
        language: data.language,
        year: data.year,
        totalTime: data.totalTime
      });
    }

    return details;
  }

  public getBook$(): Observable<BookGroupModel[]> {

    return of(this.mapToBookList(this.responseData))
    return this.http.get<any>(environment.apiUrl + ApiEndpointsUrl.book)
      .pipe(
        map(response => {
          return this.mapToBookList(response);
        })
      );
  }


  public mapToBookDetailsPayload(list: BookListModel, userId: string): any {
    return {
      id: list.id,
      userId: userId
    };
  }

  public storeWishBook$(bookList: BookListModel, userId): Observable<any> {
    //const bookDetailsPayload = this.mapToBookDetailsPayload(bookList, userId);

    return this.http.post<BookListItem>(environment.apiUrl + ApiEndpointsUrl.wishList + '?uid=' + userId + '?bookId' + bookList.id, bookList)
    .pipe(
      map(response => response)
    );
  }

  public storeFavoriteBook$(bookList: BookListModel, userId): Observable<any> {

    return this.http.post<BookListItem>(environment.apiUrl + ApiEndpointsUrl.wishList + + '?bookId' + bookList.id + '?uid=' + userId, bookList)
    .pipe(
      map(response => response)
    );
  }

  public getBookById$(bookId: string): Observable<BookListModel> {

    return of(this.mapToBookDetails(this.responseBookDetails));
    return this.http.get<any>(environment.apiUrl + ApiEndpointsUrl.bookDetails + '?id=' + bookId)
      .pipe(
        map(response => {
          return this.mapToBookDetails(response);
        })
      );
  }
}
