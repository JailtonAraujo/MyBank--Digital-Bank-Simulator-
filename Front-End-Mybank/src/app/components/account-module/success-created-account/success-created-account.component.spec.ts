import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreatedAccountComponent } from './success-created-account.component';

describe('SuccessCreatedAccountComponent', () => {
  let component: SuccessCreatedAccountComponent;
  let fixture: ComponentFixture<SuccessCreatedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreatedAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCreatedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
