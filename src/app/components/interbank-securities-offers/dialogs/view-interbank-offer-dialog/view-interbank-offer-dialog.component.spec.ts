import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterbankOfferDialogComponent } from './view-interbank-offer-dialog.component';

describe('ViewInterbankOfferDialogComponent', () => {
	let component: ViewInterbankOfferDialogComponent;
	let fixture: ComponentFixture<ViewInterbankOfferDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ViewInterbankOfferDialogComponent],
		});
		fixture = TestBed.createComponent(ViewInterbankOfferDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
