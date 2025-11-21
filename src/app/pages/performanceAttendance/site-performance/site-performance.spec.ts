import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePerformance } from './site-performance';

describe('SitePerformance', () => {
  let component: SitePerformance;
  let fixture: ComponentFixture<SitePerformance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitePerformance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitePerformance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
