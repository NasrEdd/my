import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusParSemestreComponent } from './cursus-par-semestre.component';

describe('CursusParSemestreComponent', () => {
  let component: CursusParSemestreComponent;
  let fixture: ComponentFixture<CursusParSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusParSemestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusParSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
