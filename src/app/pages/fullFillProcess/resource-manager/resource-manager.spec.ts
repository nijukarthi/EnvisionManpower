import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManager } from './resource-manager';

describe('ResourceManager', () => {
  let component: ResourceManager;
  let fixture: ComponentFixture<ResourceManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
