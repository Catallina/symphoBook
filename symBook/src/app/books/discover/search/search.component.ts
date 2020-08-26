import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { takeWhile } from 'rxjs/operators';

import { BookDetailsFacade } from '@syb/global/book-details/book-details.facade';
import { BookGroupModel } from '@syb/books/models/book-group.model';
import { AuthService } from '@syb/auth/auth.service';
import { BooksService } from '@syb/books/books.service';
import { SpecialCharactersPipe } from '@syb/books/discover/search/special-characters.pipe';

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

  public selectFilter = ['General', 'Title'];
  public filter = 'General';

  constructor(
    private bookFacade: BookDetailsFacade,
    private authService: AuthService,
    private booksService: BooksService,
    private alertCtrl: AlertController,
    private specialCPipe: SpecialCharactersPipe,
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
    if (this.searchInput) {
      this.bookFacade.getStoreSearchGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
        this.loadedBook = book;
      }, error => {
          const message = error;
          console.warn(error)
          this.showAlert(message);
      });
      this.bookFacade.searchBook(this.searchInput.toLocaleLowerCase(), this.filter)
    }
  }

  public searchAfterImage(event) {
    let input = this.specialCPipe.transform(event);

    if (event) {
      this.bookFacade.getStoreSearchGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
        this.loadedBook = book;
      }, error => {
        const message = error;
        console.warn(error)
        this.showAlert(message);
      });

      this.searchInput = input.toLocaleLowerCase().replace('_', ' ').substring(0, 30);
      this.searchInput = this.searchInput.toLocaleLowerCase().replace('\n', ' ');
    }

    if (this.searchInput) {
      this.bookFacade.searchBook(this.searchInput.toLocaleLowerCase(), this.filter)
    }
  }

  public onSearchCancel(event) {
    console.warn(event);
  }

  public onSearchClear(event) {
    this.bookFacade.getStoreBookGroup$().pipe(takeWhile(() => this.isAlive)).subscribe((book: BookGroupModel[]) => {
      this.loadedBook = book;
    });
  }

  
  private showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Okay']})
      .then((alertEl) => alertEl.present());
  }

  private omit_special_char(event) {   
    var k;
    document.all ? k = event.keyCode : k = event.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

}
