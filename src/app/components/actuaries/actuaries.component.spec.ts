import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuariesComponent } from './actuaries.component';

describe('ActuariesComponent', () => {
	let component: ActuariesComponent;
	let fixture: ComponentFixture<ActuariesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ActuariesComponent],
		});
		fixture = TestBed.createComponent(ActuariesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
