import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumerComponent } from './resumer.component';

describe('ResumerComponent', () => {
  let component: ResumerComponent;
  let fixture: ComponentFixture<ResumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
