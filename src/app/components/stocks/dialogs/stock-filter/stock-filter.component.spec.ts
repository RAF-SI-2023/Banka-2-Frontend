import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFilterComponent } from './stock-filter.component';

describe('StockFilterComponent', () => {
	let component: StockFilterComponent;
	let fixture: ComponentFixture<StockFilterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StockFilterComponent],
		});
		fixture = TestBed.createComponent(StockFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
