import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexInfoDialogComponent } from './forex-info-dialog.component';

describe('ForexInfoDialogComponent', () => {
	let component: ForexInfoDialogComponent;
	let fixture: ComponentFixture<ForexInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ForexInfoDialogComponent],
		});
		fixture = TestBed.createComponent(ForexInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
