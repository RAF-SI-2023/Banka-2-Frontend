import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTCOfferComponent } from './otc-offers.component';

describe('OTCOfferComponent', () => {
	let component: OTCOfferComponent;
	let fixture: ComponentFixture<OTCOfferComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [OTCOfferComponent],
		});
		fixture = TestBed.createComponent(OTCOfferComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
