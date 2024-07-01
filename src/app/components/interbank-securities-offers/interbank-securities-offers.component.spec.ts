import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterbankSecuritiesOffersComponent } from './interbank-securities-offers.component';

describe('InterbankSecuritiesOffersComponent', () => {
	let component: InterbankSecuritiesOffersComponent;
	let fixture: ComponentFixture<InterbankSecuritiesOffersComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [InterbankSecuritiesOffersComponent],
		});
		fixture = TestBed.createComponent(InterbankSecuritiesOffersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
