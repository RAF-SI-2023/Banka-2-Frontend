import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankExchangeComponent } from './bank-exchange.component';

describe('BankExchangeComponent', () => {
  let component: BankExchangeComponent;
  let fixture: ComponentFixture<BankExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankExchangeComponent]
    });
    fixture = TestBed.createComponent(BankExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
