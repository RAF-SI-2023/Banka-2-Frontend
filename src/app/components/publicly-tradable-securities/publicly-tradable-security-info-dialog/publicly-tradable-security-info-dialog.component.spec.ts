import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclyTradableSecurityInfoDialogComponent } from './publicly-tradable-security-info-dialog.component';

describe('PubliclyTradableSecurityInfoDialogComponent', () => {
	let component: PubliclyTradableSecurityInfoDialogComponent;
	let fixture: ComponentFixture<PubliclyTradableSecurityInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PubliclyTradableSecurityInfoDialogComponent],
		});
		fixture = TestBed.createComponent(
			PubliclyTradableSecurityInfoDialogComponent,
		);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
