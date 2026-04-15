import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyRequestList } from './consultancy-request-list';

describe('ConsultancyRequestList', () => {
  let component: ConsultancyRequestList;
  let fixture: ComponentFixture<ConsultancyRequestList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultancyRequestList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultancyRequestList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
