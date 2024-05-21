import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyEmployeeComponent } from './add-company-employee.component';

describe('AddCompanyEmployeeComponent', () => {
	let component: AddCompanyEmployeeComponent;
	let fixture: ComponentFixture<AddCompanyEmployeeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AddCompanyEmployeeComponent],
		});
		fixture = TestBed.createComponent(AddCompanyEmployeeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
