import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoDialogComponent } from './order-info-dialog.component';

describe('OrderInfoDialogComponent', () => {
	let component: OrderInfoDialogComponent;
	let fixture: ComponentFixture<OrderInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [OrderInfoDialogComponent],
		});
		fixture = TestBed.createComponent(OrderInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
