import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoAssignEditForm } from './po-assign-edit-form';

describe('PoAssignEditForm', () => {
  let component: PoAssignEditForm;
  let fixture: ComponentFixture<PoAssignEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoAssignEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoAssignEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
