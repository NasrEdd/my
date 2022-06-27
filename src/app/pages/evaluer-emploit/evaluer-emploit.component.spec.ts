import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerEmploitComponent } from './evaluer-emploit.component';

describe('EvaluerEmploitComponent', () => {
  let component: EvaluerEmploitComponent;
  let fixture: ComponentFixture<EvaluerEmploitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluerEmploitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluerEmploitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
