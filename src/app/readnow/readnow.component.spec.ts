import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadnowComponent } from './readnow.component';

describe('ReadnowComponent', () => {
  let component: ReadnowComponent;
  let fixture: ComponentFixture<ReadnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
