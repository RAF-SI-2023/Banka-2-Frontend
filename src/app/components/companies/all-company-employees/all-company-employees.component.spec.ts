import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyEmployeesComponent } from './all-company-employees.component';

describe('AllCompanyEmployeesComponent', () => {
	let component: AllCompanyEmployeesComponent;
	let fixture: ComponentFixture<AllCompanyEmployeesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AllCompanyEmployeesComponent],
		});
		fixture = TestBed.createComponent(AllCompanyEmployeesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
