import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsRowComponent } from './ads-row.component';

describe('AdsRowComponent', () => {
  let component: AdsRowComponent;
  let fixture: ComponentFixture<AdsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
