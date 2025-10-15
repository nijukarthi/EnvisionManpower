import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagerAssign } from './resource-manager-assign';

describe('ResourceManagerAssign', () => {
  let component: ResourceManagerAssign;
  let fixture: ComponentFixture<ResourceManagerAssign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceManagerAssign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceManagerAssign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
