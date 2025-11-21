import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Terminate } from './terminate';

describe('Terminate', () => {
  let component: Terminate;
  let fixture: ComponentFixture<Terminate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terminate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Terminate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
