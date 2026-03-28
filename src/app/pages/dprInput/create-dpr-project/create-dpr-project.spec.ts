import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDprProject } from './create-dpr-project';

describe('CreateDprProject', () => {
  let component: CreateDprProject;
  let fixture: ComponentFixture<CreateDprProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDprProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDprProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
