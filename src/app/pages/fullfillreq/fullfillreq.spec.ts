import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fullfillreq } from './fullfillreq';

describe('Fullfillreq', () => {
  let component: Fullfillreq;
  let fixture: ComponentFixture<Fullfillreq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fullfillreq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fullfillreq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
