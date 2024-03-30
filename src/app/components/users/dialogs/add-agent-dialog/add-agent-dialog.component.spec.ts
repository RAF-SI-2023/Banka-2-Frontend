import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentDialogComponent } from './add-agent-dialog.component';

describe('AddAgentDialogComponent', () => {
  let component: AddAgentDialogComponent;
  let fixture: ComponentFixture<AddAgentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentDialogComponent]
    });
    fixture = TestBed.createComponent(AddAgentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
