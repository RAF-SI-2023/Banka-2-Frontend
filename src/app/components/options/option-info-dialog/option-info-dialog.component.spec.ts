import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoDialogComponent } from './option-info-dialog.component';

describe('OptionInfoDialogComponent', () => {
	let component: OptionInfoDialogComponent;
	let fixture: ComponentFixture<OptionInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [OptionInfoDialogComponent],
		});
		fixture = TestBed.createComponent(OptionInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
