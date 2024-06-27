import { TestBed } from '@angular/core/testing';

import { InterbankTradableSecuritiesService } from './interbank-tradable-securities.service';

describe('InterbankTradableSecuritiesService', () => {
  let service: InterbankTradableSecuritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterbankTradableSecuritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
