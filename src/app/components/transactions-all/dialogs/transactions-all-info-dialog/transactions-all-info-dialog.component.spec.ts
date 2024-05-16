import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAllInfoDialogComponent } from './transaction-all-info-dialog.component';

describe('TransactionsAllInfoDialogComponent', () => {
	let component: TransactionsAllInfoDialogComponent;
	let fixture: ComponentFixture<TransactionsAllInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TransactionsAllInfoDialogComponent],
		});
		fixture = TestBed.createComponent(TransactionsAllInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	//it('should create', () => {
	//	expect(component).toBeTruthy();
	//});
});
