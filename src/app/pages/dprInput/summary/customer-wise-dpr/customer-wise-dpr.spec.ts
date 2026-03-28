import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseDpr } from './customer-wise-dpr';

describe('CustomerWiseDpr', () => {
  let component: CustomerWiseDpr;
  let fixture: ComponentFixture<CustomerWiseDpr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerWiseDpr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWiseDpr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
