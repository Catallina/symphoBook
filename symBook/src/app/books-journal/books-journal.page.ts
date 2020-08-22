import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BooksJournalService } from './books-journal.service';
import { BookListModel } from '@syb/shared/models/book-list.model';
import { AuthService } from '@syb/auth/auth.service';
import { JournalBookDetailsFacade } from '@syb/books-journal/store/books-journal/books-journal.facade';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { LoadingController } from '@ionic/angular';

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
    private authService: AuthService,
    private booksJournalService: BooksJournalService,
    public loadingCtrl: LoadingController,
    public bookFacade: BookDetailsFacade,
    ) { 
      this.isAlive = true;
    }

  ngOnInit() {
  

    this.authService.userId.pipe(takeWhile(() => this.isAlive)).subscribe((userId: string) => {
      this.userId = userId;
      //this.booksJournalFacade.getBookDetails(userId);
    //  this.booksJournalService.fetchBookJournalDetails(userId);
    });

  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  onDeleteAll() {
    this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
      loadingEl.present();

      this.booksJournalService.deleteAllBooks$(this.userId).subscribe(() => {
        loadingEl.dismiss();
      });

      setTimeout(() => {
        window.location.reload()
      }, 1000);
    });
  }

}
