import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRegistryComponent } from './get-registry.component';

describe('GetRegistryComponent', () => {
  let component: GetRegistryComponent;
  let fixture: ComponentFixture<GetRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
