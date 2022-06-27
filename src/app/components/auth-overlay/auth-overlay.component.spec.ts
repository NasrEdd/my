import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOverlayComponent } from './auth-overlay.component';

describe('AuthOverlayComponent', () => {
  let component: AuthOverlayComponent;
  let fixture: ComponentFixture<AuthOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
