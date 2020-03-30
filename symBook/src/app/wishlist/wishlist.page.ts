import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, IonItemSliding } from '@ionic/angular';

import { Wishlist } from '@syb/wishlist//wishlist.model';
import { Subscription } from 'rxjs';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'syb-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit, OnDestroy {
  loadedBook: Wishlist[];
  private bookingSub: Subscription;

  constructor(
    private wishlistService: WishlistService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.wishlistService.bookings.subscribe(book => {
      this.loadedBook = book;
    });
  }

  onCancelBook(bookId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.wishlistService.cancelBook(bookId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

}
