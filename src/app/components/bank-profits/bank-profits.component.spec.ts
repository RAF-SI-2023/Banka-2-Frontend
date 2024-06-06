import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProfitsComponent } from './bank-profits.component';

describe('BankProfitsComponent', () => {
	let component: BankProfitsComponent;
	let fixture: ComponentFixture<BankProfitsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BankProfitsComponent],
		});
		fixture = TestBed.createComponent(BankProfitsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
