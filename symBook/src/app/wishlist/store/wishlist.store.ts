import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { WishlistState, initialWishlistState } from '@syb/wishlist/store/wishlist.state';
import { BookListModel } from '@syb/shared/models/book-list.model';

@Injectable({
  providedIn: 'root',
})

export class WishlistStore {
  private wishlistStore: WishlistState = Object.assign({}, initialWishlistState);

  private bookDetailsSubject = new BehaviorSubject<BookListModel[]>(initialWishlistState.bookDetails);

  constructor (
    private logger: NGXLogger,
  ) {}

  public set wishlistDetails(item: BookListModel[]) {
    this.wishlistStore.bookDetails = item;
    this.logger.debug('WISHLIST - Display wish book', { item: item, store: this.wishlistStore });
    this.bookDetailsSubject.next(Object.assign({}, this.wishlistStore).bookDetails);
  }

  public get wishlistDetails$(): Observable<BookListModel[]> {
    return this.bookDetailsSubject.asObservable();
  }

  public reset(): void {
    this.wishlistStore = Object.assign({}, initialWishlistState);

    this.logger.debug('WISHLIST -  Reset store', { store: this.wishlistStore});

    this.bookDetailsSubject.next(Object.assign({}, initialWishlistState).bookDetails);
  }
}
