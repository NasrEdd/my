import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableErreurComponent } from './table-erreur.component';

describe('TableErreurComponent', () => {
  let component: TableErreurComponent;
  let fixture: ComponentFixture<TableErreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableErreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
