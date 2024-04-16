import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditInfoDialogComponent } from './credit-info-dialog.component';

describe('CreditInfoDialogComponent', () => {
	let component: CreditInfoDialogComponent;
	let fixture: ComponentFixture<CreditInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreditInfoDialogComponent],
		});
		fixture = TestBed.createComponent(CreditInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
