import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarginTransactionComponent } from './create-margin-transaction.component';

describe('CreateMarginTransactionComponent', () => {
	let component: CreateMarginTransactionComponent;
	let fixture: ComponentFixture<CreateMarginTransactionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreateMarginTransactionComponent],
		});
		fixture = TestBed.createComponent(CreateMarginTransactionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
