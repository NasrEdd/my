import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesMenuSideBarComponent } from './modules-menu-side-bar.component';

describe('ModulesMenuSideBarComponent', () => {
  let component: ModulesMenuSideBarComponent;
  let fixture: ComponentFixture<ModulesMenuSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesMenuSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesMenuSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
