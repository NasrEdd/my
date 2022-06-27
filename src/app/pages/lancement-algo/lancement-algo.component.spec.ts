import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancementAlgoComponent } from './lancement-algo.component';

describe('LancementAlgoComponent', () => {
  let component: LancementAlgoComponent;
  let fixture: ComponentFixture<LancementAlgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancementAlgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancementAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
