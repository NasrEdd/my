import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterSectionComponent } from './semester-section.component';

describe('SemesterSectionComponent', () => {
  let component: SemesterSectionComponent;
  let fixture: ComponentFixture<SemesterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
