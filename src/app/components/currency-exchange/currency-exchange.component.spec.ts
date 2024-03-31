import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeComponent } from './currency-exchange.component';

describe('CurrencyExchangeComponent', () => {
	let component: CurrencyExchangeComponent;
	let fixture: ComponentFixture<CurrencyExchangeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CurrencyExchangeComponent],
		});
		fixture = TestBed.createComponent(CurrencyExchangeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
