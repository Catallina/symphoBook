import { BooksJournalService } from './books-journal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { BooksJournalStore } from './store/books-journal.store';
import { AuthService } from '@syb/auth/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'syb-books-journal',
  templateUrl: './books-journal.page.html',
  styleUrls: ['./books-journal.page.scss'],
})
export class BooksJournalPage implements OnInit, OnDestroy {
  private isAlive: boolean = false;

  public loadedBook: BookListModel[];
  public userId: string;

  constructor(
    private booksJournalStore: BooksJournalStore,
    private authService: AuthService,
    private booksJournalService: BooksJournalService,

  ) { }

  ngOnInit() {
    this.isAlive = true;

    this.authService.userId.pipe(takeWhile(() => this.isAlive)).subscribe((userId: string) => {
      this.userId = userId;
      this.booksJournalService.fetchBookJournalDetails(userId);
    });

    this.booksJournalStore.booksJournalDetails$.pipe(takeWhile(() => this.isAlive))
    .subscribe((bookList: BookListModel[]) => { 
      this.loadedBook = bookList;
    })

  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
