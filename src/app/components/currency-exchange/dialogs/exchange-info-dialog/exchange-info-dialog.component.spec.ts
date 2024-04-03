import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeInfoDialogComponent } from './exchange-info-dialog.component';

describe('ExchangeInfoDialogComponent', () => {
  let component: ExchangeInfoDialogComponent;
  let fixture: ComponentFixture<ExchangeInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeInfoDialogComponent]
    });
    fixture = TestBed.createComponent(ExchangeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
