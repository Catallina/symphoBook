import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Book } from '@syb/books/books.model';
import { AuthService } from '@syb/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books = new BehaviorSubject<Book[]>([
    // new Book(
    //   'p1',
    //   'Manhattan Mansion',
    //   'In the heart of New York City.',
    //   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
    //   149.99,
    //   new Date('2019-01-01'),
    //   new Date('2019-12-31'),
    //   'abc',
    // ),
    // new Book(
    //   'p2',
    //   'la Toujours',
    //   'A romantic Book in Paris!',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
    //   189.99,
    //   new Date('2019-01-01'),
    //   new Date('2019-12-31'),
    //   'abc'
    // ),
    // new Book(
    //   'p3',
    //   'The Foggy Palace',
    //   'Not your average city trip!',
    //   'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
    //   99.99,
    //   new Date('2019-01-01'),
    //   new Date('2019-12-31'),
    //   'abc'
    // )
  ]);

  get Books() {
    return this.books.asObservable();
  }

  constructor(private authService: AuthService) {}

  getBook(id: string) {
    return this.Books.pipe(
      take(1),
      map(Books => {
        return { ...Books.find(p => p.id === id) };
      })
    );
  }

  // addBook(
  //   title: string,
  //   description: string,
  //   price: number,
  //   dateFrom: Date,
  //   dateTo: Date
  // ) {
  //   const newBook = new Book(
  //     Math.random().toString(),
  //     title,
  //     description,
  //     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
  //     price,
  //     dateFrom,
  //     dateTo,
  //     this.authService.userId
  //   );
  //   return this.Books.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(Books => {
  //       this.books.next(Books.concat(newBook));
  //     })
  //   );
  // }

  // updateBook(BookId: string, title: string, description: string) {
  //   return this.Books.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(Books => {
  //       const updatedBookIndex = Books.findIndex(pl => pl.id === BookId);
  //       const updatedBooks = [...Books];
  //       const oldBook = updatedBooks[updatedBookIndex];
  //       updatedBooks[updatedBookIndex] = new Book(
  //         oldBook.id,
  //         title,
  //         description,
  //         oldBook.imageUrl,
  //         oldBook.price,
  //         oldBook.availableFrom,
  //         oldBook.availableTo,
  //         oldBook.userId
  //       );
  //       this.books.next(updatedBooks);
  //     })
  //   );
  // }
}
