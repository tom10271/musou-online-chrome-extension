import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLoginComponent } from './daily-login.component';

describe('DailyLoginComponent', () => {
  let component: DailyLoginComponent;
  let fixture: ComponentFixture<DailyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
