import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeAssociationComponent } from './mode-association.component';

describe('ModeAssociationComponent', () => {
  let component: ModeAssociationComponent;
  let fixture: ComponentFixture<ModeAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
