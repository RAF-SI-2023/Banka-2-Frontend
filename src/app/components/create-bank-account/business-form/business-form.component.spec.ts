import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFormComponent } from './business-form.component';

describe('BusinessFormComponent', () => {
	let component: BusinessFormComponent;
	let fixture: ComponentFixture<BusinessFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BusinessFormComponent],
		});
		fixture = TestBed.createComponent(BusinessFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
