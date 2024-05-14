import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFormComponent } from './internal-form.component';

describe('InternalFormComponent', () => {
	let component: InternalFormComponent;
	let fixture: ComponentFixture<InternalFormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [InternalFormComponent],
		});
		fixture = TestBed.createComponent(InternalFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
