import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BookListModel } from '@syb/shared/models/book-list.model';
import { AuthService } from '@syb/auth/auth.service';
import { JournalBookDetailsFacade } from '@syb/books-journal/store/books-journal/books-journal.facade';
import { BooksJournalService } from '../books-journal.service';
import { LoadingController } from '@ionic/angular';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BooksService } from '@syb/books/books.service';

@Component({
  selector: 'syb-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private isAlive: boolean = false;

  public loadedBook: BookListModel[];
  public userId: string;

  constructor(
    private booksJournalFacade: JournalBookDetailsFacade,
    private authService: AuthService,
    private bookFacade: BookDetailsFacade,
    private booksJournalService: BooksJournalService,
    public loadingCtrl: LoadingController,
    private booksService: BooksService,
  ) { 
    this.isAlive = true;
  }

  ngOnInit() {
    this.getDetails();

    this.authService.userId.pipe(takeWhile(() => this.isAlive)).subscribe((userId: string) => {
      this.userId = userId;
      this.booksJournalFacade.getBookDetails(userId);
    });

    // this.booksJournalFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive))
    // .subscribe((bookList: BookListModel[]) => { 
    //   this.loadedBook = bookList;
    // })


  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  getDetails() {
    this.loadingCtrl.create({
      message: 'Loading Content. Please Wait...'
    }).then(loadingEl => {
      loadingEl.present();

      this.booksJournalFacade.getStoreBookDetails$().pipe(takeWhile(() => this.isAlive))
        .subscribe((bookList: BookListModel[]) => { 
          this.loadedBook = bookList;

          loadingEl.dismiss();
        });
    });
  }

  public onSelectedBook(bookId: string): void {
    this.bookFacade.selectedBook(bookId);
    this.authService.userId.subscribe((userId) =>{
      this.booksService.openedBooks$(bookId, userId).subscribe();
    })
  }

  onDeleteAll() {
    this.booksJournalFacade.deleteBook(this.userId);
    
    this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
      loadingEl.present();

      this.booksJournalFacade.getBookDetails(this.userId);
      setTimeout(() => {
        loadingEl.dismiss();
      }, 1000);
    });
  }

}
