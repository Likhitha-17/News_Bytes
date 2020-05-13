import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontactedComponent } from './usercontacted.component';

describe('UsercontactedComponent', () => {
  let component: UsercontactedComponent;
  let fixture: ComponentFixture<UsercontactedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercontactedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercontactedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
