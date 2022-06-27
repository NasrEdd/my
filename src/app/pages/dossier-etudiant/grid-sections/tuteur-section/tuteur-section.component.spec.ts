import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurSectionComponent } from './tuteur-section.component';

describe('TuteurSectionComponent', () => {
  let component: TuteurSectionComponent;
  let fixture: ComponentFixture<TuteurSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuteurSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuteurSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
