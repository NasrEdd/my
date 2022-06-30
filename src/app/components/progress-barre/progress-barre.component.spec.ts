import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarreComponent } from './progress-barre.component';

describe('ProgressBarreComponent', () => {
  let component: ProgressBarreComponent;
  let fixture: ComponentFixture<ProgressBarreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
