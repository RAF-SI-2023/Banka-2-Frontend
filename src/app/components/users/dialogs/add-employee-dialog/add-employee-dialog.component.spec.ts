import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeDialogComponent } from './add-employee-dialog.component';

describe('AddEmployeeDialogComponent', () => {
	let component: AddEmployeeDialogComponent;
	let fixture: ComponentFixture<AddEmployeeDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AddEmployeeDialogComponent],
		});
		fixture = TestBed.createComponent(AddEmployeeDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
