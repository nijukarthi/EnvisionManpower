import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Envisionroles } from './envisionroles';

describe('Envisionroles', () => {
  let component: Envisionroles;
  let fixture: ComponentFixture<Envisionroles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Envisionroles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Envisionroles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
