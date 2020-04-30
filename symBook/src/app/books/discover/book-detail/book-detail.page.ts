import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';

import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';

import { WishlistService } from '@syb/wishlist/wishlist.service';
import { BookListModel } from '@syb/books/models/book-list.model';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public bookDetails: BookListModel;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private bookFacade: BookDetailsFacade,
  ) {}

  ngOnInit() {
    this.isAlive = true;

    this.bookFacade.getStoreBook$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookListModel) => {
      this.bookDetails = book;
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public onWishBook(event: Event) {
    event.stopPropagation();
  }
}
