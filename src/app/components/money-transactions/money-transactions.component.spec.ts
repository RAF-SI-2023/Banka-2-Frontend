import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransactionsComponent } from './money-transactions.component';

describe('MoneyTransactionsComponent', () => {
	let component: MoneyTransactionsComponent;
	let fixture: ComponentFixture<MoneyTransactionsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MoneyTransactionsComponent],
		});
		fixture = TestBed.createComponent(MoneyTransactionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
