import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteWiseDprInput } from './site-wise-dpr-input';

describe('SiteWiseDprInput', () => {
  let component: SiteWiseDprInput;
  let fixture: ComponentFixture<SiteWiseDprInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteWiseDprInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteWiseDprInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
