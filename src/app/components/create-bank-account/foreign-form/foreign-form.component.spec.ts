import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignFormComponent } from './foreign-form.component';

describe('ForeignFormComponent', () => {
	let component: ForeignFormComponent;
	let fixture: ComponentFixture<ForeignFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ForeignFormComponent],
		});
		fixture = TestBed.createComponent(ForeignFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
