import { TestBed } from '@angular/core/testing';

import { ActionAgentProfitService } from './action-agent-profit.service';

describe('ActionAgentProfitService', () => {
	let service: ActionAgentProfitService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ActionAgentProfitService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
