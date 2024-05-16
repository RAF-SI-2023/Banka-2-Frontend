import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclyTradableSecuritiesComponent } from './publicly-tradable-securities.component';

describe('PubliclyTradableSecuritiesComponent', () => {
	let component: PubliclyTradableSecuritiesComponent;
	let fixture: ComponentFixture<PubliclyTradableSecuritiesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PubliclyTradableSecuritiesComponent],
		});
		fixture = TestBed.createComponent(PubliclyTradableSecuritiesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
