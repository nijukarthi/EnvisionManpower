import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvisionRoles } from './envision-roles';

describe('EnvisionRoles', () => {
  let component: EnvisionRoles;
  let fixture: ComponentFixture<EnvisionRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvisionRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvisionRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
