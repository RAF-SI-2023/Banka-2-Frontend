import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditReqInfoDialogComponent } from './credit-req-info-dialog.component';

describe('CreditReqInfoDialogComponent', () => {
	let component: CreditReqInfoDialogComponent;
	let fixture: ComponentFixture<CreditReqInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreditReqInfoDialogComponent],
		});
		fixture = TestBed.createComponent(CreditReqInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
