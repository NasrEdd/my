import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeSectionComponent } from './bibliotheque-section.component';

describe('BibliothequeSectionComponent', () => {
  let component: BibliothequeSectionComponent;
  let fixture: ComponentFixture<BibliothequeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliothequeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothequeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
