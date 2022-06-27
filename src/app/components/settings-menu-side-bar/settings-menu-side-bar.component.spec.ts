import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMenuSideBarComponent } from './settings-menu-side-bar.component';

describe('SettingsMenuSideBarComponent', () => {
  let component: SettingsMenuSideBarComponent;
  let fixture: ComponentFixture<SettingsMenuSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsMenuSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMenuSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
