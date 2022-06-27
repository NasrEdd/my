import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterFicheComponent } from './importer-fiche.component';

describe('ImporterFicheComponent', () => {
  let component: ImporterFicheComponent;
  let fixture: ComponentFixture<ImporterFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImporterFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporterFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
