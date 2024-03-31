import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogComponent } from './add-dialog.component';

describe('AddDialogComponent', () => {
	let component: AddDialogComponent;
	let fixture: ComponentFixture<AddDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AddDialogComponent],
		});
		fixture = TestBed.createComponent(AddDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
