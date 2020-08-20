import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { takeWhile } from 'rxjs/operators';

import { BookListModel } from '@syb/shared/models/book-list.model';
import { AuthService } from './../auth/auth.service';
import { WishlistService } from '@syb/wishlist/wishlist.service';
import { WishlistStore } from '@syb/wishlist/store/wishlist.store';

@Component({
  selector: 'syb-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit, OnDestroy {
  private isAlive: boolean = false;
  
  public loadedBook: BookListModel[];
  public userId: string;

  constructor(
    private wishlistStore: WishlistStore,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.authService.userId.pipe(takeWhile(() => this.isAlive)).subscribe((userId: string) => {
      this.userId = userId;
      this.wishlistService.fetchWishlistDetails(userId);
    });

    this.wishlistStore.wishlistDetails$.pipe(takeWhile(() => this.isAlive))
    .subscribe((bookList: BookListModel[]) => { 
      this.loadedBook = bookList;
    })
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  onDeleteBook(bookId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
      loadingEl.present();

      this.wishlistService.deleteBook(bookId).subscribe(() => {
        this.wishlistService.books.subscribe((b) => {
          this.loadedBook = b;
          loadingEl.dismiss();
        });
      });
    });
  }

}
