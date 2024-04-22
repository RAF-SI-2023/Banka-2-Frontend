import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInfoDialogComponent } from './agent-info-dialog.component';

describe('AgentInfoDialogComponent', () => {
  let component: AgentInfoDialogComponent;
  let fixture: ComponentFixture<AgentInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AgentInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
