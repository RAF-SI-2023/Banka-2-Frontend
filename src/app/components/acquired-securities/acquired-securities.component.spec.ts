import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredSecuritiesComponent } from './acquired-securities.component';

describe('AcquiredSecuritiesComponent', () => {
	let component: AcquiredSecuritiesComponent;
	let fixture: ComponentFixture<AcquiredSecuritiesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AcquiredSecuritiesComponent],
		});
		fixture = TestBed.createComponent(AcquiredSecuritiesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
