import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransactionsProfitsComponent } from './bank-transactions-profits.component';

describe('BankTransactionsProfitsComponent', () => {
	let component: BankTransactionsProfitsComponent;
	let fixture: ComponentFixture<BankTransactionsProfitsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BankTransactionsProfitsComponent],
		});
		fixture = TestBed.createComponent(BankTransactionsProfitsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
