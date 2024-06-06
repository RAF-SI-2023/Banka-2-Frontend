import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTransactionsAllComponent } from './order-transactions-all.component';

describe('OrderTransactionsAllComponent', () => {
	let component: OrderTransactionsAllComponent;
	let fixture: ComponentFixture<OrderTransactionsAllComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [OrderTransactionsAllComponent],
		});
		fixture = TestBed.createComponent(OrderTransactionsAllComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
