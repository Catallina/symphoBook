import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';

import { AuthService } from '@syb/auth/auth.service';
import { BooksService } from '@syb/books/books.service';
import { WishlistService } from '@syb/wishlist/wishlist.service';

import { Book } from '@syb/books/books.model';
import { CreateWishlistComponent } from '@syb/wishlist/create-wishlist/create-wishlist.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss']
})
export class BookDetailPage implements OnInit, OnDestroy {
  book: Book;
  isBookable = false;
  private bookSub: Subscription;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('bookId')) {
        this.navCtrl.navigateBack('/books/tabs/discover');
        return;
      }
      this.bookSub = this.booksService
        .getBook(paramMap.get('bookId'))
        .subscribe(book => {
          this.book = book;
          this.isBookable = book.userId !== this.authService.userId;
        });
    });
  }

  onWishBook() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    // console.log(mode);
    this.modalCtrl
      .create({
        component: CreateWishlistComponent,
        componentProps: { selectedBook: this.book, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking book...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              // this.wishlistService
              //   .addBooking(
              //     this.book.id,
              //     this.book.title,
              //     this.book.imageUrl,
              //     data.firstName,
              //     data.lastName,
              //     data.guestNumber,
              //     data.startDate,
              //     data.endDate
              //   )
              //   .subscribe(() => {
              //     loadingEl.dismiss();
              //   });
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
}
