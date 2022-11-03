import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMyaccountComponent } from './header-myaccount.component';

describe('HeaderMyaccountComponent', () => {
  let component: HeaderMyaccountComponent;
  let fixture: ComponentFixture<HeaderMyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMyaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
