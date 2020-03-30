import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWishlistComponent } from './create-wishlist.component';

describe('CreateBookingComponent', () => {
  let component: CreateWishlistComponent;
  let fixture: ComponentFixture<CreateWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
