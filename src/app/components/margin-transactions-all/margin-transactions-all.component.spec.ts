import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginTransactionsAllComponent } from './margin-transactions-all.component';

describe('MarginTransactionsAllComponent', () => {
	let component: MarginTransactionsAllComponent;
	let fixture: ComponentFixture<MarginTransactionsAllComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MarginTransactionsAllComponent],
		});
		fixture = TestBed.createComponent(MarginTransactionsAllComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
