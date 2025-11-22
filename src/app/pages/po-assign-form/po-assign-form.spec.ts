import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoAssignForm } from './po-assign-form';

describe('PoAssignForm', () => {
  let component: PoAssignForm;
  let fixture: ComponentFixture<PoAssignForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoAssignForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoAssignForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
