import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledProductsComponent } from './disabled-products.component';

describe('DisabledProductsComponent', () => {
  let component: DisabledProductsComponent;
  let fixture: ComponentFixture<DisabledProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
