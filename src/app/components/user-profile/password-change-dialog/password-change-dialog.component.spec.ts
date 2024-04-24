import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeDialogComponent } from './password-change-dialog.component';

describe('PasswordChangeDialogComponent', () => {
	let component: PasswordChangeDialogComponent;
	let fixture: ComponentFixture<PasswordChangeDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PasswordChangeDialogComponent],
		});
		fixture = TestBed.createComponent(PasswordChangeDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
