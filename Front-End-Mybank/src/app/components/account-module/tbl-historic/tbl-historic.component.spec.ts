import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblHistoricComponent } from './tbl-historic.component';

describe('TblHistoricComponent', () => {
  let component: TblHistoricComponent;
  let fixture: ComponentFixture<TblHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblHistoricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TblHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
