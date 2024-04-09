import { TestBed } from '@angular/core/testing';

import { FuturesContractService } from './futures-contract.service';

describe('FuturesContractService', () => {
  let service: FuturesContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuturesContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
