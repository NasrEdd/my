import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTraitementComponent } from './pre-traitement.component';

describe('PreTraitementComponent', () => {
  let component: PreTraitementComponent;
  let fixture: ComponentFixture<PreTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
