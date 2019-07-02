import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRegistryComponent } from './detail-registry.component';

describe('DetailRegistryComponent', () => {
  let component: DetailRegistryComponent;
  let fixture: ComponentFixture<DetailRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
