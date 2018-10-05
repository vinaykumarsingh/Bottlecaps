import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingproductComponent } from './landingproduct.component';

describe('LandingproductComponent', () => {
  let component: LandingproductComponent;
  let fixture: ComponentFixture<LandingproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
