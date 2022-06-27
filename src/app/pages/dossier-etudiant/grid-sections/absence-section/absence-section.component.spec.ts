import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceSectionComponent } from './absence-section.component';

describe('AbsenceSectionComponent', () => {
  let component: AbsenceSectionComponent;
  let fixture: ComponentFixture<AbsenceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
