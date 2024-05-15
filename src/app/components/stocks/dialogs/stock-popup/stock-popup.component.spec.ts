import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPopupComponent } from './stock-popup.component';

describe('StockPopupComponent', () => {
  let component: StockPopupComponent;
  let fixture: ComponentFixture<StockPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockPopupComponent]
    });
    fixture = TestBed.createComponent(StockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
