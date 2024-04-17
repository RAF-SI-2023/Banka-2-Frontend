import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDialogComponent } from './add-company-dialog.component';

describe('AddCompanyDialogComponent', () => {
	let component: AddCompanyDialogComponent;
	let fixture: ComponentFixture<AddCompanyDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AddCompanyDialogComponent],
		});
		fixture = TestBed.createComponent(AddCompanyDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
