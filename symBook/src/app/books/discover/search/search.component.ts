import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { takeWhile } from 'rxjs/operators';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { AuthService } from '@syb/auth/auth.service';
import { BooksService } from '@syb/books/books.service';

@Component({
  selector: 'syb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() loadedBook: BookGroupModel[];

  @Input() modalCtrl: ModalController;

  private isAlive = false;

  public searchInput: string;

  public selectFilter = ['General', 'Title', 'Author'];
  public filter = 'General';


  constructor(
    private bookFacade: BookDetailsFacade,
    private authService: AuthService,
    private booksService: BooksService,
    private alertCtrl: AlertController,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {

  }
  
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public onSelectedBook(bookId: string): void {
    this.bookFacade.selectedBook(bookId);
    this.authService.userId.subscribe((userId) =>{
      this.booksService.openedBooks$(bookId, userId).subscribe();
    })
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public selectFilterType() {
    this.bookFacade.selectFilter(this.filter);
  }

  public onSearchInput(event) {
    this.bookFacade.getStoreSearchGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.loadedBook = book;
    }, error => {
        const message = error;
        console.warn(error)
        this.showAlert(message);
    });

    if (this.searchInput) {
      this.bookFacade.searchBook(this.searchInput.toLocaleLowerCase())
    }
  }

  public searchAfterImage(event) {
    this.bookFacade.getStoreSearchGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.loadedBook = book;
    }, error => {
      const message = error;
      console.warn(error)
      this.showAlert(message);
    });
    console.warn(event)

    if (event) {
      this.searchInput = event.toLocaleLowerCase().replace('\n', ' ');
    }

    if (this.searchInput) {
      this.bookFacade.searchBook(this.searchInput.toLocaleLowerCase())
    }
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Okay']})
      .then((alertEl) => alertEl.present());
  }

  public onSearchCancel(event) {
    console.warn(event);
  }

  public onSearchClear(event) {
    this.bookFacade.getStoreBookGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.loadedBook = book;
    });
    //this.bookFacade.searchBook(null)
  }

}
