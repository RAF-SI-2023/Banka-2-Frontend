import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInfoDialogComponent } from './stock-info-dialog.component';

describe('StockInfoDialogComponent', () => {
  let component: StockInfoDialogComponent;
  let fixture: ComponentFixture<StockInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockInfoDialogComponent]
    });
    fixture = TestBed.createComponent(StockInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
