import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { AuthService } from '@syb/auth/auth.service';
import { BookModel } from '@syb/books/books.model';
import { BookDetailsFacade } from '@syb/books/store/book-details/book-details.facade';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'syb-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  public isAlive: boolean = false;

  public bookDetails: BookModel[];

  loadedBooks: BookModel[];
  listedLoadedBooks: BookModel[];
  relevantBooks: BookModel[];
  private BooksSub: Subscription;

  constructor(
    private bookFacade: BookDetailsFacade,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.isAlive = true;

    this.bookFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookModel[]) => {
      this.bookDetails = book;
    });
    // this.BooksSub = this.booksService.Books.subscribe(Books => {
    //   this.loadedBooks = Books;
    //   this.relevantBooks = this.loadedBooks;
    //   this.listedLoadedBooks = this.relevantBooks.slice(1);
    // });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  // onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
  //   if (event.detail.value === 'all') {
  //     this.relevantBooks = this.loadedBooks;
  //     this.listedLoadedBooks = this.relevantBooks.slice(1);
  //   } else {
  //     this.relevantBooks = this.loadedBooks.filter(
  //       place => place.userId !== this.authService.userId
  //     );
  //     this.listedLoadedBooks = this.relevantBooks.slice(1);
  //   }
  // }

  ngOnDestroy() {
    if (this.BooksSub) {
      this.BooksSub.unsubscribe();
    }
  }
}
