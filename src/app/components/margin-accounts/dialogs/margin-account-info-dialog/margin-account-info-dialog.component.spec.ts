import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginAccountInfoDialogComponent } from './margin-account-info-dialog.component';

describe('MarginAccountInfoDialogComponent', () => {
	let component: MarginAccountInfoDialogComponent;
	let fixture: ComponentFixture<MarginAccountInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MarginAccountInfoDialogComponent],
		});
		fixture = TestBed.createComponent(MarginAccountInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
