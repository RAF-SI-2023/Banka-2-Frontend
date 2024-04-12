import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BankAccountMaskDirective } from './bank-account-mask.directive';
import { Component, DebugElement } from '@angular/core';

@Component({
	template: `<input
		type="text"
		appBankAccountMask
	/>`,
})
class TestComponent {}

describe('BankAccountMaskDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let inputEl: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestComponent, BankAccountMaskDirective],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		inputEl = fixture.debugElement.query(By.css('input'));
		fixture.detectChanges();
	});

	it('should apply the bank account mask', () => {
		// Simulate user input
		inputEl.nativeElement.value = '1234567890123456';
		inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });

		// Ensure that the input value is properly masked
		expect(inputEl.nativeElement.value).equal('123-4567-890123456');
	});
});
