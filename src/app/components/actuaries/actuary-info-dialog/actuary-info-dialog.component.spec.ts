import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaryInfoDialogComponent } from './actuary-info-dialog.component';

describe('ActuaryInfoDialogComponent', () => {
	let component: ActuaryInfoDialogComponent;
	let fixture: ComponentFixture<ActuaryInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ActuaryInfoDialogComponent],
		});
		fixture = TestBed.createComponent(ActuaryInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
