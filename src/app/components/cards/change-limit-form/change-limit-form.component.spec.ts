import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLimitFormComponent } from './change-limit-form.component';

describe('ChangeLimitFormComponent', () => {
  let component: ChangeLimitFormComponent;
  let fixture: ComponentFixture<ChangeLimitFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeLimitFormComponent]
    });
    fixture = TestBed.createComponent(ChangeLimitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
