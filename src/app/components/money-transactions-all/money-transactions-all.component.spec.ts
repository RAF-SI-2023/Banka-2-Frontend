import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransactionsAllComponent } from './money-transactions-all.component';

describe('MoneyTransactionsAllComponent', () => {
	let component: MoneyTransactionsAllComponent;
	let fixture: ComponentFixture<MoneyTransactionsAllComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MoneyTransactionsAllComponent],
		});
		fixture = TestBed.createComponent(MoneyTransactionsAllComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
