import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  private isAlive = false;

  public searchInput: string;

  public selectFilter = ['General', 'Title', 'Author'];
  public filter = 'General';


  constructor(
    private modalCtrl: ModalController,
    private bookFacade: BookDetailsFacade,
    private authService: AuthService,
    private booksService: BooksService,
  ) {
    this.isAlive = true;
  }

  ngOnInit() {

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
    
  // }
  
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
    });
    this.bookFacade.searchBook(this.filter, this.searchInput)
  }

  public onSearchCancel(event) {
    console.warn(event);
  }

  public onSearchClear(event) {
    console.warn(event);
  }

}
