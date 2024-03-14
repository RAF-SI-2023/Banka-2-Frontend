import { TestBed } from '@angular/core/testing';

import { BankProfileService } from './bank-profile.service';

describe('BankProfileService', () => {
  let service: BankProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
