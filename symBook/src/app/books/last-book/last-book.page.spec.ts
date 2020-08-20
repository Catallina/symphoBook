import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LastBookPage } from './last-book.page';

describe('LastBookPage', () => {
  let component: LastBookPage;
  let fixture: ComponentFixture<LastBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LastBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
