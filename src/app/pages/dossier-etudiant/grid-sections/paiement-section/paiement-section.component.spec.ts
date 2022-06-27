import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSectionComponent } from './paiement-section.component';

describe('PaiementSectionComponent', () => {
  let component: PaiementSectionComponent;
  let fixture: ComponentFixture<PaiementSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
