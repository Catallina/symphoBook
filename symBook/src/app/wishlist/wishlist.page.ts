import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, IonItemSliding } from '@ionic/angular';

import { BookListModel } from '@syb/shared/models/book-list.model';
import { WishlistService } from './wishlist.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'syb-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit, OnDestroy {
  private isAlive: boolean = false;
  public loadedBook: any;

  constructor(
    private wishlistService: WishlistService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.wishlistService.getWishBook$().pipe(takeWhile(() => this.isAlive)).subscribe(book => {
      this.loadedBook = book;
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  onDeleteBook(bookId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
      loadingEl.present();
      this.wishlistService.deleteBook(bookId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

}
