import { TestBed } from '@angular/core/testing';

import { BooksJournalService } from './books-journal.service';

describe('BooksJournalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksJournalService = TestBed.get(BooksJournalService);
    expect(service).toBeTruthy();
  });
});
