import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistryComponent } from './add-registry.component';

describe('AddRegistryComponent', () => {
  let component: AddRegistryComponent;
  let fixture: ComponentFixture<AddRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
