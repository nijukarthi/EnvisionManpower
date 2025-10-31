import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyPage } from './consultancy-page';

describe('ConsultancyPage', () => {
  let component: ConsultancyPage;
  let fixture: ComponentFixture<ConsultancyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultancyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultancyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
