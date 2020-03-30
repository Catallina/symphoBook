import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { AuthService } from '@syb/auth/auth.service';
import { Book } from '@syb/books/books.model';
import { BooksService } from '@syb/books/books.service';

@Component({
  selector: 'syb-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedBooks: Book[];
  listedLoadedBooks: Book[];
  relevantBooks: Book[];
  private BooksSub: Subscription;

  constructor(
    private booksService: BooksService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.BooksSub = this.booksService.Books.subscribe(Books => {
      this.loadedBooks = Books;
      this.relevantBooks = this.loadedBooks;
      this.listedLoadedBooks = this.relevantBooks.slice(1);
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantBooks = this.loadedBooks;
      this.listedLoadedBooks = this.relevantBooks.slice(1);
    } else {
      this.relevantBooks = this.loadedBooks.filter(
        place => place.userId !== this.authService.userId
      );
      this.listedLoadedBooks = this.relevantBooks.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.BooksSub) {
      this.BooksSub.unsubscribe();
    }
  }
}
