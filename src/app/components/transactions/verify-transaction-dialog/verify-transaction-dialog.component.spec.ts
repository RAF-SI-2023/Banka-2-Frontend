import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTransactionDialogComponent } from './verify-transaction-dialog.component';

describe('VerifyTransactionDialogComponent', () => {
	let component: VerifyTransactionDialogComponent;
	let fixture: ComponentFixture<VerifyTransactionDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [VerifyTransactionDialogComponent],
		});
		fixture = TestBed.createComponent(VerifyTransactionDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
