import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInfoDialogComponent } from './currency-info-dialog.component';

describe('CurrencyInfoDialogComponent', () => {
  let component: CurrencyInfoDialogComponent;
  let fixture: ComponentFixture<CurrencyInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyInfoDialogComponent]
    });
    fixture = TestBed.createComponent(CurrencyInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
