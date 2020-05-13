import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassswordComponent } from './forget-passsword.component';

describe('ForgetPassswordComponent', () => {
  let component: ForgetPassswordComponent;
  let fixture: ComponentFixture<ForgetPassswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPassswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
