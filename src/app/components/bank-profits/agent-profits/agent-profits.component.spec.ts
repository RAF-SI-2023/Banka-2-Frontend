import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfitsComponent } from './agent-profits.component';

describe('AgentProfitsComponent', () => {
	let component: AgentProfitsComponent;
	let fixture: ComponentFixture<AgentProfitsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AgentProfitsComponent],
		});
		fixture = TestBed.createComponent(AgentProfitsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
