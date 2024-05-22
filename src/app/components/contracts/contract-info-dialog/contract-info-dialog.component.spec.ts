import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInfoDialogComponent } from './contract-info-dialog.component';

describe('ContractInfoDialogComponent', () => {
	let component: ContractInfoDialogComponent;
	let fixture: ComponentFixture<ContractInfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ContractInfoDialogComponent],
		});
		fixture = TestBed.createComponent(ContractInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
