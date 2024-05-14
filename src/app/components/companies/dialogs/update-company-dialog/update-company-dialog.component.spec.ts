import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyDialogComponent } from './update-company-dialog.component';

describe('UpdateCompanyDialogComponent', () => {
	let component: UpdateCompanyDialogComponent;
	let fixture: ComponentFixture<UpdateCompanyDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UpdateCompanyDialogComponent],
		});
		fixture = TestBed.createComponent(UpdateCompanyDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
