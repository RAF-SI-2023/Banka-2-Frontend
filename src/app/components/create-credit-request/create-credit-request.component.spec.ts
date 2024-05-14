import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreditRequestComponent } from './create-credit-request.component';

describe('CreateCreditRequestComponent', () => {
	let component: CreateCreditRequestComponent;
	let fixture: ComponentFixture<CreateCreditRequestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreateCreditRequestComponent],
		});
		fixture = TestBed.createComponent(CreateCreditRequestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
