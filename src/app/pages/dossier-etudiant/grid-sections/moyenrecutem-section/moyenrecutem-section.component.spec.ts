import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyenrecutemSectionComponent } from './moyenrecutem-section.component';

describe('MoyenrecutemSectionComponent', () => {
  let component: MoyenrecutemSectionComponent;
  let fixture: ComponentFixture<MoyenrecutemSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyenrecutemSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoyenrecutemSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
