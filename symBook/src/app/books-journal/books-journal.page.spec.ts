import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BooksJournalPage } from './books-journal.page';

describe('BooksJournalPage', () => {
  let component: BooksJournalPage;
  let fixture: ComponentFixture<BooksJournalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksJournalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksJournalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
