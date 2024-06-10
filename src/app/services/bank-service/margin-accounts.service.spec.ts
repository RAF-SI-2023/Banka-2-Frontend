import { TestBed } from '@angular/core/testing';

import { MarginAccountsService } from './margin-accounts.service';

describe('MarginAccountsService', () => {
	let service: MarginAccountsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MarginAccountsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
