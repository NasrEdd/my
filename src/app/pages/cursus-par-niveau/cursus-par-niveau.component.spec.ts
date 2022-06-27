import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusParNiveauComponent } from './cursus-par-niveau.component';

describe('CursusParNiveauComponent', () => {
  let component: CursusParNiveauComponent;
  let fixture: ComponentFixture<CursusParNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusParNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusParNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
