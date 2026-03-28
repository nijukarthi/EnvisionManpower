import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWtgDetails } from './view-wtg-details';

describe('ViewWtgDetails', () => {
  let component: ViewWtgDetails;
  let fixture: ComponentFixture<ViewWtgDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWtgDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWtgDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
