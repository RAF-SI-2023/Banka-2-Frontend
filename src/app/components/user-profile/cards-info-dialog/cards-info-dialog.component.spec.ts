import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInfoDialogComponent } from './cards-info-dialog.component';

describe('CardsInfoDialogComponent', () => {
	let component: CardsInfoDialogComponent;
	let fixture: ComponentFixture<CardsInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CardsInfoDialogComponent],
		});
		fixture = TestBed.createComponent(CardsInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
