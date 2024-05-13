import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAllFilterComponent } from './transactions-all-filter.component';

describe('TransactionsAllFilterComponent', () => {
	let component: TransactionsAllFilterComponent;
	let fixture: ComponentFixture<TransactionsAllFilterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TransactionsAllFilterComponent],
		});
		fixture = TestBed.createComponent(TransactionsAllFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	//it('should create', () => {
	//	expect(component).toBeTruthy();
	//});
});
