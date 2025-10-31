import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUserPage } from './guest-user-page';

describe('GuestUserPage', () => {
  let component: GuestUserPage;
  let fixture: ComponentFixture<GuestUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestUserPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
