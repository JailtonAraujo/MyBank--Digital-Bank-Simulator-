import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawMoneyComponentComponent } from './withdraw-money-component.component';

describe('WithdrawMoneyComponentComponent', () => {
  let component: WithdrawMoneyComponentComponent;
  let fixture: ComponentFixture<WithdrawMoneyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawMoneyComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawMoneyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
