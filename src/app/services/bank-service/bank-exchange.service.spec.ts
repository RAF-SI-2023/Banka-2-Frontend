import { TestBed } from '@angular/core/testing';

import { BankExchangeService } from './bank-exchange.service';

describe('BankExchangeService', () => {
  let service: BankExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
