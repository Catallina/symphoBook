import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap, delay, map } from 'rxjs/operators';

import { AuthService } from '@syb/auth/auth.service';
import { BookListModel } from '@syb/shared/models/book-list.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private book = new BehaviorSubject<BookListModel[]>([]);

  get bookings() {
    return this.book.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  public mapToBookDetailsPayload(list): BookListModel[] {
    const details: BookListModel[] = [];
    for ( const element  in list) {
      if (list.hasOwnProperty(element)) {
        const bookList = new BookListModel({
          element,
          author: list[element].author,
          date: list[element].date,
          description: list[element].description,
          imageUrl: list[element].imageUrl,
          title: list[element].title,
        });
        details.push(bookList);
      }
    }
    return details;
  }

  public getWishBook$(): Observable<BookListModel[]> {
    return this.http
      .get<{[key: string]: BookListModel }>('https://symphobook.firebaseio.com/book.json')
      .pipe(
        map(response => {
          return this.mapToBookDetailsPayload(response);
        })
      );
  }

  // addBooking(
  //   placeId: string,
  //   placeTitle: string,
  //   placeImage: string,
  //   firstName: string,
  //   lastName: string,
  //   guestNumber: number,
  //   dateFrom: Date,
  //   dateTo: Date
  // ) {
  //   const newBooking = new Wishlist(
  //     Math.random().toString(),
  //     placeId,
  //     this.authService.userId,
  //     placeTitle,
  //     placeImage,
  //     firstName,
  //     lastName,
  //     guestNumber,
  //     dateFrom,
  //     dateTo
  //   );
  //   return this.bookings.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(bookings => {
  //       this.wishlist.next(bookings.concat(newBooking));
  //     })
  //   );
  // }

  deleteBook(bookId: string) {
    return this.book.pipe(
      take(1),
      delay(1000),
      tap(bookList => {
        console.warn(bookList);
        this.book.next(bookList.filter(book => book.id !== bookId));
      })
    );
  }
}
