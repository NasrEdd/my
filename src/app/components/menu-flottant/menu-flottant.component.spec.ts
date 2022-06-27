import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFlottantComponent } from './menu-flottant.component';

describe('MenuFlottantComponent', () => {
  let component: MenuFlottantComponent;
  let fixture: ComponentFixture<MenuFlottantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFlottantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFlottantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
