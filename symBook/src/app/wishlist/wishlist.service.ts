import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';

import { AuthService } from '@syb/auth/auth.service';
import { Wishlist } from '@syb/wishlist//wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist = new BehaviorSubject<Wishlist[]>([]);

  get bookings() {
    return this.wishlist.asObservable();
  }

  constructor(private authService: AuthService) {}

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

  cancelBook(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this.wishlist.next(bookings.filter(b => b.id !== bookingId));
      })
    );
  }
}
