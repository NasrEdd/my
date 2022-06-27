import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsAdministratifsComponent } from './documents-administratifs.component';

describe('DocumentsAdministratifsComponent', () => {
  let component: DocumentsAdministratifsComponent;
  let fixture: ComponentFixture<DocumentsAdministratifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsAdministratifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsAdministratifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
