import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFormComponent } from './external-form.component';

describe('ExternalFormComponent', () => {
	let component: ExternalFormComponent;
	let fixture: ComponentFixture<ExternalFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ExternalFormComponent],
		});
		fixture = TestBed.createComponent(ExternalFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
