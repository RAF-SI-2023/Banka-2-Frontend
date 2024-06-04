import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBlockFormComponent } from './change-block-form.component';

describe('ChangeBlockFormComponent', () => {
  let component: ChangeBlockFormComponent;
  let fixture: ComponentFixture<ChangeBlockFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBlockFormComponent]
    });
    fixture = TestBed.createComponent(ChangeBlockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
