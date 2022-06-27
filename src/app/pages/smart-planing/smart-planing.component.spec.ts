import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPlaningComponent } from './smart-planing.component';

describe('SmartPlaningComponent', () => {
  let component: SmartPlaningComponent;
  let fixture: ComponentFixture<SmartPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartPlaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
